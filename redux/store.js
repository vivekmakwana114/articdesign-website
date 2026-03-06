import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import ordersReducer from "./orders/ordersSlice";
import shippingAddressReducer from "./orders/shippingAddressSlice";
import devicesReducer from "./devices/devicesSlice";
import productsReducer from "./products/productsSlice";
import topproductsReducer from "./products/topproductsSlice";
import cartReducer from "./cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  orders: ordersReducer,
  devices: devicesReducer,
  products: productsReducer,
  topproducts: topproductsReducer,
  shippingAddress: shippingAddressReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
