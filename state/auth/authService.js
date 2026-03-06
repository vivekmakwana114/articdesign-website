import { api } from "@/lib/api";

// signup / register API
export const signup = (data) => {
  return api.post(`/v1/auth/register`, data);
};

// signin / login API
export const login = (credentials) => {
  return api.post(`/v1/auth/login`, credentials);
};

// forgot password API
export const forgotPassword = (email) => {
  return api.post(`/v1/auth/forgot-password`, { email });
};

// Reset password using token and new password
export const resetPassword = ({ token, password }) => {
  return api.post(`/v1/auth/reset-password`, { token, password });
};

