import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // array to store all
  product: {},
  error: null,
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsStart: (state) => {
      state.loading = true;
    },
    productsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    productsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    singleProductStart: (state) => {
      state.loading = true;
    },

    singleProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    singleProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  productsStart,
  productsSuccess,
  productsFailure,
  singleProductStart,
  singleProductSuccess,
  singleProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
