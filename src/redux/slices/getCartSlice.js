// ** Library Imports
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getProductCart = createAsyncThunk("getProductCart", async () => {
  try {
    const response = await instance.get(endpoint.wo_commerce_get_cart);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const removeItem = createAsyncThunk("removeItem", async (key) => {
  try {
    const nonce = await instance.get(endpoint.get_nonce);
    if (nonce.data) {
      const uniqueNonce = nonce.data;

      const headers = {
        "X-WC-Store-API-Nonce": uniqueNonce,
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      };

      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + endpoint.remove_cart_item + key,
        { headers }
      );

      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const getCartSlice = createSlice({
  name: "productCart",
  initialState: {
    productCart: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getProductCart.pending]: (state) => {
      state.loading = true;
    },
    [getProductCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.productCart = action.payload;
    },
    [getProductCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getCartSlice.reducer;
