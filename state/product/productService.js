import { api } from "@/lib/api";

// Get products (skins) with filtering support
export const getProducts = (params) => {
  return api.get("/v1/product", { params });
};

// Get a single product by slug or ID
export const getProductById = (id) => {
  return api.get(`/v1/product/${id}`);
};
