import { api } from "@/lib/api";

// Update user Info
export const updatUserProfile = (id, data) => {
  return api.patch(`/v1/user/${id}`, data);
};

// Change password
export const changePassword = (id, data) => {
  return api.post(`/v1/user/change/password/${id}`, data);
};

// Deactivate user
export const deactivateUser = (id, data) => {
  return api.post(`/v1/user/deactivate/${id}`, data);
};

// Get customer related orders
export const getCustomerOrders = (customerId, params) => {
  return api.get(`/v1/customers/${customerId}/orders`, { params });
};

// Create a support ticket
export const createSupportTicket = (data) => {
  return api.post(`/v1/support-tickets`, data);
};
