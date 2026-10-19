"use client";

import { useDispatch } from "react-redux";
import { setCartItems } from "@/redux/slices/cartSlice";
import { getCart } from "@/services/cart";

export function useCart() {
  const dispatch = useDispatch();

  async function syncCartToRedux() {
    const latestCart = await getCart();
    dispatch(setCartItems(latestCart?.data?.products ?? []));
  }

  return {
    syncCartToRedux,
  };
}
