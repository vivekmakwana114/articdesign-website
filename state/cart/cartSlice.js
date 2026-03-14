import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as addToCartApi,
  getCart,
  updateCartItem,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "./cartService";

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (cartData, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      const hasToken = !!auth?.tokens?.access?.token;

      if (hasToken) {
        const res = await addToCartApi(cartData);
        return res.data;
      } else {
        return rejectWithValue({
          message: "Please login to add product into cart",
        });
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to add to cart",
        },
      );
    }
  },
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const hasToken = !!auth?.tokens?.access?.token;

      if (hasToken) {
        const res = await getCart();
        return res.data;
      } else {
        return { data: { items: [] }, guest: true };
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch cart" },
      );
    }
  },
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, data }, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      if (auth?.tokens?.access?.token) {
        const res = await updateCartItem(id, data);
        return res.data;
      }
      return rejectWithValue({ message: "Login required" });
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to update item" },
      );
    }
  },
);

export const incrementItem = createAsyncThunk(
  "cart/incrementItem",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      if (auth?.tokens?.access?.token) {
        const res = await incrementQuantity(id);
        return res.data;
      }
      return rejectWithValue({ message: "Login required" });
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to increment" },
      );
    }
  },
);

export const decrementItem = createAsyncThunk(
  "cart/decrementItem",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      if (auth?.tokens?.access?.token) {
        const res = await decrementQuantity(id);
        return res.data;
      }
      return rejectWithValue({ message: "Login required" });
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to decrement" },
      );
    }
  },
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      if (auth?.tokens?.access?.token) {
        const res = await removeFromCart(id);
        return res.data;
      }
      return rejectWithValue({ message: "Login required" });
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to remove item" },
      );
    }
  },
);

const initialState = {
  cartStatus: "idle",
  cartError: null,
  cartData: null,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartStatus: (state) => {
      state.cartStatus = "idle";
      state.cartError = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartStatus = "succeeded";
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.payload?.message || "Failed to add to cart";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (!action.payload.guest) {
          state.cartItems = action.payload?.data?.items || [];
          state.cartData = action.payload?.data;
        } else {
          state.cartData = {
            items: [],
            totalPrice: 0,
          };
          state.cartItems = [];
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        // Handle post-removal UI update if needed, though fetchCart is usually called after
      });
  },
});

export const { resetCartStatus, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
