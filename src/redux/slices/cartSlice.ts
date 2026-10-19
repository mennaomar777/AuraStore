import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    clearCartItems(state) {
      state.items = [];
    },
  },
});

export const { setCartItems, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
