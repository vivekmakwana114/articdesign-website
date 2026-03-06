import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topproducts: [], // array to store all
  error: null,
  loading: false,
};

const topproductsSlice = createSlice({
  name: "topproducts",
  initialState,
  reducers: {
    topproductsStart: (state) => {
      state.loading = true;
    },
    topproductsSuccess: (state, action) => {
      state.topproducts = action.payload;
      state.loading = false;
      state.error = null;
    },
    topproductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { topproductsStart, topproductsSuccess, topproductsFailure } =
  topproductsSlice.actions;

export default topproductsSlice.reducer;
