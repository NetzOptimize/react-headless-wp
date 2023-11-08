// ** Library Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getStoreData = createAsyncThunk("getStoreData", async () => {
  try {
    const response = await instance.get(endpoint.wo_commerce_products, {
      params: {
        per_page: 50,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const storeDataSlice = createSlice({
  name: "storeData",
  initialState: {
    storeData: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getStoreData.pending]: (state) => {
      state.loading = true;
    },
    [getStoreData.fulfilled]: (state, action) => {
      state.loading = false;
      state.storeData = action.payload;
    },
    [getStoreData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default storeDataSlice.reducer;
