import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as addToCartApi,
  getCart,
  updateCartItem,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  getTopProducts,
} from "./cartService";

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const res = await addToCartApi(cartData);
      return res.data;
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCart();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch cart" },
      );
    }
  },
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCartItem(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to update item" },
      );
    }
  },
);

export const incrementItem = createAsyncThunk(
  "cart/incrementItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await incrementQuantity(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to increment" },
      );
    }
  },
);

export const decrementItem = createAsyncThunk(
  "cart/decrementItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await decrementQuantity(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to decrement" },
      );
    }
  },
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await removeFromCart(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to remove item" },
      );
    }
  },
);

export const fetchTopProducts = createAsyncThunk(
  "cart/fetchTopProducts",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await getTopProducts(limit);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch top products" },
      );
    }
  },
);

const initialState = {
  cartStatus: "idle",
  cartError: null,
  cartData: null,
  cartItems: [],
  topProducts: [],
  topProductsStatus: "idle",
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
        // Optionally update cartData or cartItems if API returns them
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.payload?.message || "Failed to add to cart";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.data?.items || [];
        state.cartData = action.payload?.data;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        // Optimistically filter or refetch
      })
      .addCase(fetchTopProducts.pending, (state) => {
        state.topProductsStatus = "loading";
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProductsStatus = "succeeded";
        state.topProducts = action.payload?.data || action.payload || [];
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.topProductsStatus = "failed";
      });
  },
});

export const { resetCartStatus, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
