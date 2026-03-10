import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDevices } from "./deviceService";

// Fetch devices async thunk
export const fetchDevices = createAsyncThunk(
  "device/fetchDevices",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getDevices(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to fetch devices" }
      );
    }
  }
);

const initialState = {
  devicesStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  devicesError: null,
  devicesData: [],
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    resetDeviceStatus: (state) => {
      state.devicesStatus = "idle";
      state.devicesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.devicesStatus = "loading";
        state.devicesError = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devicesStatus = "succeeded";
        // Assuming the API structure follows the pattern seen in userSlice
        state.devicesData =
          action.payload?.data?.results ||
          action.payload?.results ||
          action.payload?.data?.devices ||
          action.payload?.devices ||
          action.payload?.data ||
          [];
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.devicesStatus = "failed";
        state.devicesError = action.payload?.message || "Failed to fetch devices";
      });
  },
});

export const { resetDeviceStatus } = deviceSlice.actions;
export default deviceSlice.reducer;
