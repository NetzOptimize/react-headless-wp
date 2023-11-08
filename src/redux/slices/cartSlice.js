// ** Library Imports
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const addItem = createAsyncThunk("addItem", async (id) => {
  try {
    const nonce = await instance.get(endpoint.get_nonce);
    if (nonce.data) {
      const uniqueNonce = nonce.data;

      const headers = {
        "X-WC-Store-API-Nonce": uniqueNonce,
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      };

      const formData = new FormData();
      formData.append("id", id);

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + endpoint.wo_commerce_add_to_cart,
        formData,
        { headers }
      );

      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    addToCart: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [addItem.pending]: (state) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.addToCart = action.payload;
    },
    [addItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cartSlice.reducer;
