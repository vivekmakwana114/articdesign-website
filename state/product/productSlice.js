import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  getPublicProducts,
  getPublicProductById,
  getTopProducts,
} from "./productService";

// Fetch products async thunk
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const hasToken = !!auth?.tokens?.access?.token;

      const res = hasToken
        ? await getProducts(params).catch((err) => {
            if (err.response && err.response.status === 403) {
              return getPublicProducts(params);
            }
            throw err;
          })
        : await getPublicProducts(params);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to fetch products",
        },
      );
    }
  },
);

// Fetch single product async thunk
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const hasToken = !!auth?.tokens?.access?.token;

      const res = hasToken
        ? await getProductById(id)
        : await getPublicProductById(id);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to fetch product details",
        },
      );
    }
  },
);

// Fetch top products async thunk
export const fetchTopProducts = createAsyncThunk(
  "product/fetchTopProducts",
  async (limit = 4, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const hasToken = !!auth?.tokens?.access?.token;

      const res = hasToken
        ? await getTopProducts(limit).catch((err) => {
            if (err.response && err.response.status === 403) {
              return getPublicProducts({ limit });
            }
            throw err;
          })
        : await getPublicProducts({ limit });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to fetch top products",
        },
      );
    }
  },
);

const initialState = {
  productsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  productsError: null,
  productsData: [],
  pagination: null,

  detailsStatus: "idle",
  detailsError: null,
  product: null,

  topProducts: [],
  topProductsStatus: "idle",
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
        state.productsError =
          action.payload?.message || "Failed to fetch products";
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
        state.detailsError =
          action.payload?.message || "Failed to fetch product details";
      })
      // Fetch Top Products
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

export const { resetProductStatus } = productSlice.actions;
export default productSlice.reducer;
