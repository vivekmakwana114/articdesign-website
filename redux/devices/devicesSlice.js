import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [], // array to store all
  device: {},
  error: null,
  loading: false,
  isLoaded: false,
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    devicesStart: (state) => {
      if (!state.isLoaded) {
        state.loading = true; // Show loader only if data is not already loaded
      }
    },
    devicesSuccess: (state, action) => {
      state.devices = action.payload;
      state.loading = false;
      state.isLoaded = true;
      state.error = null;
    },
    devicesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoaded = false;
    },
    singleDeviceStart: (state) => {
      state.loading = true;
    },

    singleDeviceSuccess: (state, action) => {
      state.device = action.payload;
      state.loading = false;
      state.error = null;
    },
    singleDeviceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  devicesStart,
  devicesSuccess,
  devicesFailure,
  singleDeviceStart,
  singleDeviceSuccess,
  singleDeviceFailure,
} = devicesSlice.actions;

export default devicesSlice.reducer;
