import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updatUserProfile, changePassword, deactivateUser, getCustomerOrders, createSupportTicket } from "./userService";
import { updateUserAuthData } from "../auth/authSlice";

// Update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const res = await updatUserProfile(id, formData);
      // The API returns the updated user inside `data.data`
      if (res.data && res.data.data) {
        dispatch(updateUserAuthData(res.data.data)); 
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to update profile" }
      );
    }
  }
);

// Change user password
export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async ({ id, passwordData }, { rejectWithValue }) => {
    try {
      const res = await changePassword(id, passwordData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to change password" }
      );
    }
  }
);

// Deactivate user account
export const deactivateAccount = createAsyncThunk(
  "user/deactivateAccount",
  async ({ id, reasonData }, { rejectWithValue }) => {
    try {
      const res = await deactivateUser(id, reasonData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to deactivate account" }
      );
    }
  }
);

// Fetch customer orders
export const fetchCustomerOrders = createAsyncThunk(
  "user/fetchCustomerOrders",
  async ({ customerId, params }, { rejectWithValue }) => {
    try {
      const res = await getCustomerOrders(customerId, params);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to fetch orders" }
      );
    }
  }
);

// Create a support ticket
export const createTicket = createAsyncThunk(
  "user/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const res = await createSupportTicket(ticketData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to create ticket" }
      );
    }
  }
);

const initialState = {
  updateStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  updateError: null,
  updateMessage: null,

  passwordStatus: "idle",
  passwordError: null,
  passwordMessage: null,

  deactivateStatus: "idle",
  deactivateError: null,
  deactivateMessage: null,

  ordersStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  ordersError: null,
  ordersData: null,

  ticketStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  ticketError: null,
  ticketMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = null;
      state.updateMessage = null;

      state.passwordStatus = "idle";
      state.passwordError = null;
      state.passwordMessage = null;

      state.deactivateStatus = "idle";
      state.deactivateError = null;
      state.deactivateMessage = null;

      state.ticketStatus = "idle";
      state.ticketError = null;
      state.ticketMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
        state.updateMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.updateMessage = action.payload?.message || "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload?.message || "Failed to update profile";
      })

      // Change password
      .addCase(changeUserPassword.pending, (state) => {
        state.passwordStatus = "loading";
        state.passwordError = null;
        state.passwordMessage = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.passwordStatus = "succeeded";
        state.passwordMessage = action.payload?.message || "Password changed successfully";
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.passwordStatus = "failed";
        state.passwordError = action.payload?.message || "Failed to change password";
      })

      // Deactivate account
      .addCase(deactivateAccount.pending, (state) => {
        state.deactivateStatus = "loading";
        state.deactivateError = null;
        state.deactivateMessage = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.deactivateStatus = "succeeded";
        state.deactivateMessage = action.payload?.message || "Account deactivated successfully";
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.deactivateStatus = "failed";
        state.deactivateError = action.payload?.message || "Failed to deactivate account";
      })

      // Fetch customer orders
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.ordersStatus = "loading";
        state.ordersError = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.ordersStatus = "succeeded";
        // API returns: { success, data: { results: [...], page, totalPages, ... } }
        state.ordersData =
          action.payload?.data?.results ||
          action.payload?.results ||
          action.payload?.data?.orders ||
          action.payload?.orders ||
          [];
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.ordersError = action.payload?.message || "Failed to fetch orders";
      })

      // Create support ticket
      .addCase(createTicket.pending, (state) => {
        state.ticketStatus = "loading";
        state.ticketError = null;
        state.ticketMessage = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.ticketStatus = "succeeded";
        state.ticketMessage = action.payload?.message || "Ticket submitted successfully";
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.ticketStatus = "failed";
        state.ticketError = action.payload?.message || "Failed to create ticket";
      });
  },
});

export const { resetUserStatus } = userSlice.actions;
export default userSlice.reducer;
