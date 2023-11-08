// ** Library Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getPage = createAsyncThunk("getPage", async (pageId) => {
  try {
    const response = await instance.get(endpoint.pages + pageId);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const pagesSlice = createSlice({
  name: "page",
  initialState: {
    page: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getPage.pending]: (state) => {
      state.loading = true;
    },
    [getPage.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload;
    },
    [getPage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default pagesSlice.reducer;
