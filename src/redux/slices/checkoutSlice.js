// ** Library Imports
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const checkout = createAsyncThunk("checkout", async (data) => {
  try {
    const nonce = await instance.get(endpoint.get_nonce);
    if (nonce.data) {
      const uniqueNonce = nonce.data;

      const headers = {
        "X-WC-Store-API-Nonce": uniqueNonce,
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + endpoint.checkout,
        data,
        { headers }
      );

      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [checkout.pending]: (state) => {
      state.loading = true;
    },
    [checkout.fulfilled]: (state, action) => {
      state.loading = false;
      state.checkout = action.payload;
    },
    [checkout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default checkoutSlice.reducer;
