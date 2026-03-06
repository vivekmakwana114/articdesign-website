import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  error: null,
  loading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersStart: (state) => {
      state.loading = true;
    },
    ordersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    ordersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { ordersStart, ordersSuccess, ordersFailure } =
  ordersSlice.actions;

export default ordersSlice.reducer;
