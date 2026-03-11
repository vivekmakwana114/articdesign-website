import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddress as addAddressApi,
  getAddresses,
  updateAddress as updateAddressApi,
  removeAddress,
} from "./addressService";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getAddresses(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch addresses" },
      );
    }
  },
);

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async ({ userId, addressData }, { rejectWithValue }) => {
    try {
      const res = await addAddressApi(userId, addressData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to add address" },
      );
    }
  },
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ addressId, addressData }, { rejectWithValue }) => {
    try {
      const res = await updateAddressApi(addressId, addressData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to update address" },
      );
    }
  },
);

export const deleteUserAddress = createAsyncThunk(
  "address/deleteUserAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await removeAddress(addressId);
      return { addressId, ...res.data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to delete address" },
      );
    }
  },
);

const initialState = {
  addresses: [],
  status: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddressStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload?.data || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch addresses";
      })
      .addCase(addNewAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to add address";
      })
      .addCase(editAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to update address";
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload.addressId,
        );
      });
  },
});

export const { resetAddressStatus } = addressSlice.actions;
export default addressSlice.reducer;
