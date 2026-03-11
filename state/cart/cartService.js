import { api } from "@/lib/api";

// Add item to cart
export const addToCart = (data) => {
  return api.post("/v1/cart", data);
};

// Get cart details
export const getCart = () => {
  return api.get("/v1/cart");
};

// Update cart item
export const updateCartItem = (id, data) => {
  return api.patch(`/v1/cart/item/${id}`, data);
};

// Increment quantity
export const incrementQuantity = (id) => {
  return api.patch(`/v1/cart/item/${id}/increment`);
};

// Decrement quantity
export const decrementQuantity = (id) => {
  return api.patch(`/v1/cart/item/${id}/decrement`);
};

// Remove from cart
export const removeFromCart = (id) => {
  return api.delete(`/v1/cart/item/${id}`);
};

// Apply coupon to cart
export const applyCoupon = (data) => {
  return api.post(`/v1/cart/apply/coupon`, data);
};

// Get top products
export const getTopProducts = (limit = 4) => {
  return api.get(`/v1/cart/top/products?limit=${limit}`);
};
