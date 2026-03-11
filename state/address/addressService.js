import { api } from "@/lib/api";

// Add address
export const addAddress = (userId, data) => {
  return api.post(`/v1/user/address/${userId}`, data);
};

// Get addresses
export const getAddresses = (userId) => {
  return api.get(`/v1/user/address/all/${userId}`);
};

// Get address by ID
export const getAddressById = (id) => {
  return api.get(`/v1/user/address/${id}`);
};

// Update address
export const updateAddress = (id, data) => {
  return api.put(`/v1/user/address/${id}`, data);
};

// Delete address
export const removeAddress = (id) => {
  return api.delete(`/v1/user/address/${id}`);
};
