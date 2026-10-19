"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";
import { Heart } from "lucide-react";
import { useWishlistActions } from "@/hooks/useWishlistActions";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";

export default function WishlistBtn({ product }: { product: Product }) {
  const { add, remove, isInWishlist } = useWishlistActions();

  const active = isInWishlist(product._id);

  const button = (
    <Button
      type="button"
      onClick={() => void add(product)}
      variant="outline"
      className="flex-1 cursor-pointer rounded-2xl border-2 bg-white p-6 text-gray-600 transition-all dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
    >
      <Heart className="mr-3 h-5 w-5" />
      Add to Wishlist
    </Button>
  );

  if (!active) return button;

  return (
    <ConfirmDeleteDialog
      itemName={product.title}
      description="This removes the product from your wishlist. You can add it again at any time."
      onConfirm={() => remove(product)}
      trigger={
        <Button
          type="button"
          variant="outline"
          className="flex-1 cursor-pointer rounded-2xl border-2 border-red-300 bg-red-50 p-6 text-red-600 transition-all hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
        >
          <Heart className="mr-3 h-5 w-5 fill-red-500 text-red-500" />
          Remove from Wishlist
        </Button>
      }
    />
  );
}

