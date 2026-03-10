import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "./productService";

// Fetch products async thunk
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getProducts(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to fetch products" }
      );
    }
  }
);

// Fetch single product async thunk
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to fetch product details" }
      );
    }
  }
);

const initialState = {
  productsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  productsError: null,
  productsData: [],
  pagination: null,

  detailsStatus: "idle",
  detailsError: null,
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductStatus: (state) => {
      state.productsStatus = "idle";
      state.productsError = null;
      state.detailsStatus = "idle";
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = "loading";
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.productsData = action.payload?.data || [];
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload?.message || "Failed to fetch products";
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailsStatus = "loading";
        state.detailsError = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.product = action.payload?.data || action.payload || null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.payload?.message || "Failed to fetch product details";
      });
  },
});

export const { resetProductStatus } = productSlice.actions;
export default productSlice.reducer;
