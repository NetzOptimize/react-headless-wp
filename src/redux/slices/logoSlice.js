// ** Library Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Utils imports
import instance from "../../axios/instance";
import { endpoint } from "../../auth/configs";

export const getLogo = createAsyncThunk("getLogo", async () => {
  try {
    const response = await instance.get(endpoint.settings);
    if (response.data) {
      const resp = await instance.get(
        `${endpoint.media}/${response.data.site_logo}`
      );
      return resp.data;
    }
  } catch (error) {
    throw error;
  }
});

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    media: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [getLogo.pending]: (state) => {
      state.loading = true;
    },
    [getLogo.fulfilled]: (state, action) => {
      state.loading = false;
      state.media = action.payload;
    },
    [getLogo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default mediaSlice.reducer;
