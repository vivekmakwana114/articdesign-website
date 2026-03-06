import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: null,
  error: null,
  loading: false,
};

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    shippingAddressStart: (state) => {
      state.loading = true;
    },
    shippingAddressSuccess: (state, action) => {
      state.shippingAddress = action.payload;
      state.loading = false;
      state.error = null;
    },
    shippingAddressFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  shippingAddressStart,
  shippingAddressSuccess,
  shippingAddressFailure,
} = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
