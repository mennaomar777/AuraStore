"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";

import {
  addToWishlist as addAPI,
  deleteWishListItem,
} from "@/services/wishlist";

import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/redux/store";
import type { WishlistItem } from "@/types/wishlist";

export function useWishlistActions() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.wishlist.items);

  function isInWishlist(id: string) {
    return items.some((item) => item._id === id);
  }

  async function add(product: WishlistItem) {
    const backup = product;

    try {
      dispatch(addToWishlist(product));

      const res = await addAPI(product._id);

      if (res.status !== "success") throw new Error();

      toast.success("Added to wishlist");
    } catch {
      dispatch(removeFromWishlist(backup._id));
      toast.error("Failed to add");
    }
  }

  async function remove(product: WishlistItem): Promise<boolean> {
    try {
      const res = await deleteWishListItem(product._id);
      if (res.status !== "success") {
        throw new Error(res.message || "Failed to remove from wishlist.");
      }

      dispatch(removeFromWishlist(product._id));
      toast.success("Product removed successfully from your wishlist");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove");
      return false;
    }
  }

  async function toggle(product: WishlistItem) {
    if (isInWishlist(product._id)) {
      await remove(product);
    } else {
      await add(product);
    }
  }

  return { add, remove, toggle, isInWishlist };
}
