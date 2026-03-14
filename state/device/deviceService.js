import { api } from "@/lib/api";

// Get devices with filtering support
export const getDevices = (params) => {
  return api.get("/v1/device", { params });
};

// Get public devices
export const getPublicDevices = (params) => {
  return api.get("/v1/device/public", { params });
};
