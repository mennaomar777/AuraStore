"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearCartItems, setCartItems } from "@/redux/slices/cartSlice";
import { getCart } from "@/services/cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      dispatch(clearCartItems());
      return;
    }

    if (status !== "authenticated") return;

    let cancelled = false;

    async function loadCart() {
      try {
        const res = await getCart();
        if (!cancelled) {
          dispatch(setCartItems(res?.data?.products ?? []));
        }
      } catch {
        if (!cancelled) dispatch(clearCartItems());
      }
    }

    void loadCart();

    return () => {
      cancelled = true;
    };
  }, [dispatch, status]);

  return <>{children}</>;
}
