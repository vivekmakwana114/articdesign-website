import { api } from "@/lib/api";

// Get products (skins) with filtering support
export const getProducts = (params) => {
  return api.get("/v1/product", { params });
};

// Get a single product by slug or ID
export const getProductById = (id) => {
  return api.get(`/v1/product/${id}`);
};

// Get public products
export const getPublicProducts = (params) => {
  return api.get("/v1/product/public", { params });
};

// Get a single public product by slug or ID
export const getPublicProductById = (id) => {
  return api.get(`/v1/product/public/${id}`);
};

// Get top products
export const getTopProducts = () => {
  return api.get(`/v1/cart/top/products`);
};
