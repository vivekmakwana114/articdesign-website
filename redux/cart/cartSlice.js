import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.productId === item.productId
      );

      const itemTotalPrice =
        item.basePrice +
        (item.options?.reduce((acc, option) => acc + option.price, 0) || 0);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = itemTotalPrice * existingItem.quantity;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
          totalPrice: itemTotalPrice,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice = state.cartItems.reduce(
        (acc, i) => acc + i.totalPrice,
        0
      );
    },
    reduceCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i.productId === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((i) => i.productId !== id);
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice =
            (existingItem.basePrice +
              (existingItem.options?.reduce(
                (acc, option) => acc + option.price,
                0
              ) || 0)) *
            existingItem.quantity;
        }

        state.totalQuantity -= 1;
        state.totalPrice = state.cartItems.reduce(
          (acc, i) => acc + i.totalPrice,
          0
        );
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i.productId === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        // Remove the item entirely from cartItems
        state.cartItems = state.cartItems.filter((i) => i.productId !== id);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.productId === productId
      );

      if (existingItem) {
        const itemTotalPrice =
          existingItem.basePrice +
          (existingItem.options?.reduce(
            (acc, option) => acc + option.price,
            0
          ) || 0);
        const quantityDifference = quantity - existingItem.quantity;

        existingItem.quantity = quantity;
        existingItem.totalPrice = itemTotalPrice * quantity;

        state.totalQuantity += quantityDifference;
        state.totalPrice = state.cartItems.reduce(
          (acc, i) => acc + i.totalPrice,
          0
        );
      }
    },
  },
});

// Export the actions to use in components
export const {
  addToCart,
  reduceCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   totalQuantity: 0,
//   totalPrice: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find((i) => i._id === item._id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//         existingItem.totalPrice += item.price;
//       } else {
//         state.cartItems.push({ ...item, quantity: 1, totalPrice: item.price });
//       }

//       state.totalQuantity += 1;
//       state.totalPrice += item.price;
//     },
//     reduceCart: (state, action) => {
//       const id = action.payload;
//       const existingItem = state.cartItems.find((i) => i._id === id);

//       if (existingItem) {
//         if (existingItem.quantity === 1) {
//           state.cartItems = state.cartItems.filter((i) => i._id !== id);
//         } else {
//           existingItem.quantity -= 1;
//           existingItem.totalPrice -= existingItem.price;
//         }

//         state.totalQuantity -= 1;
//         state.totalPrice -= existingItem.price;
//       }
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },
//   },
// });

// export const { addToCart, reduceCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
