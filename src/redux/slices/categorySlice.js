// ** Library Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getProductCategory = createAsyncThunk(
  "getProductCategory",
  async () => {
    try {
      const response = await instance.get(
        endpoint.wo_commerce_products_categories
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const categorySlice = createSlice({
  name: "productCategory",
  initialState: {
    productCategory: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getProductCategory.pending]: (state) => {
      state.loading = true;
    },
    [getProductCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.productCategory = action.payload;
    },
    [getProductCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
