import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },

    clearWishlist(state) {
      state.items = [];
    },

    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      state.items.push(action.payload);
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setWishlist, clearWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
