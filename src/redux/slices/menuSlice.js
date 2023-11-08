// ** Library Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getMenu = createAsyncThunk("getMenu", async () => {
  try {
    const params = {
      menus: 140,
    };

    const response = await instance.get(endpoint.menus, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const menuSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getMenu.pending]: (state) => {
      state.loading = true;
    },
    [getMenu.fulfilled]: (state, action) => {
      state.loading = false;
      state.menus = action.payload;
    },
    [getMenu.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default menuSlice.reducer;
