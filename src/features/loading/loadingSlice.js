import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    loadingCount: 0, // Track multiple simultaneous requests
    message: null, // Optional loading message
  },
  reducers: {
    startLoading: (state, action) => {
      state.loadingCount += 1;
      state.isLoading = true;
      if (action.payload?.message) {
        state.message = action.payload.message;
      }
    },
    stopLoading: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
      if (state.loadingCount === 0) {
        state.isLoading = false;
        state.message = null;
      }
    },
    resetLoading: (state) => {
      state.isLoading = false;
      state.loadingCount = 0;
      state.message = null;
    },
    setLoadingMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { startLoading, stopLoading, resetLoading, setLoadingMessage } =
  loadingSlice.actions;

export default loadingSlice.reducer;
