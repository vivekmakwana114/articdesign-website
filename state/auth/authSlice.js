import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  signup,
  forgotPassword,
  resetPassword as resetPasswordApi,
} from "./authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ identifier, password, rememberMe }, { rejectWithValue }) => {
    try {
      const res = await login({ identifier, password });

      // Return both data and the rememberMe flag
      return { ...res.data, rememberMe };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Something went wrong",
        },
      );
    }
  },
);

export const sendForgotPassword = createAsyncThunk(
  "auth/sendForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotPassword(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Something went wrong",
        },
      );
    }
  },
);

// Signup / register user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signup(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Registration failed",
        },
      );
    }
  },
);

// Perform password reset using token
export const performResetPassword = createAsyncThunk(
  "auth/performResetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi({ token, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to reset password",
        },
      );
    }
  },
);

const getInitialState = () => {
  if (typeof window !== "undefined") {
    try {
      // Check localStorage first, then sessionStorage
      const raw =
        localStorage.getItem("auth") || sessionStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...{
            user: null,
            tokens: null,
            role: null,
            redirect: null,
            status: "idle",
            error: null,
            forgotPasswordMessage: null,
            provider: null,
          },
          ...parsed,
        };
      }
    } catch (_) {}
  }
  return {
    user: null,
    tokens: null,
    role: null,
    redirect: null,
    provider: null,
    status: "idle",
    error: null,
    forgotPasswordMessage: null,
    resetStatus: "idle",
    resetMessage: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.role = null;
      state.provider = null;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("auth");
          sessionStorage.removeItem("auth");
        } catch (_) {}
      }
    },
    updateUserAuthData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          try {
            const authData = JSON.stringify({
              user: state.user,
              tokens: state.tokens,
              provider: state.provider,
            });
            if (localStorage.getItem("auth")) {
              localStorage.setItem("auth", authData);
            } else if (sessionStorage.getItem("auth")) {
              sessionStorage.setItem("auth", authData);
            }
          } catch (_) {}
        }
      }
    },
    loginSuccess: (state, action) => {
      const { user, tokens, provider, rememberMe = true } = action.payload;
      state.user = user;
      state.tokens = tokens;
      state.provider = provider;
      state.status = "succeeded";
      state.error = null;

      if (typeof window !== "undefined") {
        try {
          const authData = JSON.stringify({ user, tokens, provider });
          if (rememberMe) {
            localStorage.setItem("auth", authData);
            sessionStorage.removeItem("auth");
          } else {
            sessionStorage.setItem("auth", authData);
            localStorage.removeItem("auth");
          }
        } catch (_) {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login reducers...
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { rememberMe, ...payloadData } = action.payload;
        const responseData = payloadData.data || {};

        state.user = responseData.user;
        state.tokens = responseData.token;
        state.provider = responseData.provider;
        // state.redirect = data.redirect;

        if (typeof window !== "undefined") {
          try {
            const authData = JSON.stringify({
              user: state.user,
              tokens: state.tokens,
              provider: state.provider,
            });

            if (rememberMe) {
              localStorage.setItem("auth", authData);
              sessionStorage.removeItem("auth"); // Clear session if exists
            } else {
              sessionStorage.setItem("auth", authData);
              localStorage.removeItem("auth"); // Clear local if exists
            }
          } catch (_) {}
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("auth");
            sessionStorage.removeItem("auth");
          } catch (_) {}
        }
      })

      // forgot password reducers
      .addCase(sendForgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(sendForgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forgotPasswordMessage =
          action.payload.message || "Reset link sent";
      })
      .addCase(sendForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to send reset link";
        state.forgotPasswordMessage = null;
      })

      // perform reset password reducers
      .addCase(performResetPassword.pending, (state) => {
        state.resetStatus = "loading";
        state.resetMessage = null;
        state.error = null;
      })
      .addCase(performResetPassword.fulfilled, (state, action) => {
        state.resetStatus = "succeeded";
        state.resetMessage =
          action.payload.message || "Password reset successfully";
      })
      .addCase(performResetPassword.rejected, (state, action) => {
        state.resetStatus = "failed";
        state.error = action.payload?.message || "Failed to reset password";
      })

      // signup reducers
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { setUserRole, logout, updateUserAuthData, loginSuccess } =
  authSlice.actions;
export default authSlice.reducer;
