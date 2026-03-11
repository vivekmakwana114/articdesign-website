import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import deviceReducer from "./device/deviceSlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import addressReducer from "./address/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    device: deviceReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});
