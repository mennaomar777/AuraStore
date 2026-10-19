"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearWishlist, setWishlist } from "@/redux/slices/wishlistSlice";
import { getWishlist } from "@/services/wishlist";

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      dispatch(clearWishlist());
      return;
    }

    if (status !== "authenticated") return;

    let cancelled = false;

    async function loadWishlist() {
      try {
        const res = await getWishlist();
        if (!cancelled) {
          dispatch(setWishlist(res.data));
        }
      } catch {
        if (!cancelled) dispatch(clearWishlist());
      }
    }

    void loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [dispatch, status]);

  return <>{children}</>;
}
