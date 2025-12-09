import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, name, price, quantity: 1 });
      }

      state.totalAmount += price;
    },
    removeItem(state, action) {
      const { id } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);

      if (index === -1) return;

      const item = state.items[index];
      item.quantity -= 1;
      state.totalAmount = Math.max(0, state.totalAmount - item.price);

      if (item.quantity <= 0) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export const selectCartTax = createSelector(
  [(state) => state.cart.totalAmount],
  (totalAmount) => Number((totalAmount * 0.1).toFixed(2))
);

export default store;
