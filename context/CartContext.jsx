// src/context/cart-provider.js
"use client"; // Ensure this is present

import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  reduceCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cart/cartSlice";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const addItemToCart = (item) => dispatch(addToCart(item));
  const reduceItemInCart = (id) => dispatch(reduceCart(id));
  const updateItemInCart = (id) => dispatch(updateQuantity(id));
  const removeItemFromCart = (id) => dispatch(removeFromCart(id));
  const clearCartItems = () => dispatch(clearCart());

  return (
    <CartContext.Provider
      value={{
        cartState,
        addItemToCart,
        reduceItemInCart,
        updateItemInCart,
        removeItemFromCart,
        clearCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
