"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { addToCart, getCart, updateQuantity } from "@/services/cart";
import type { Product } from "@/types/products";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CartItem } from "@/types/cart";

export default function AddToCartBtn({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity?: number;
}) {
  const { syncCartToRedux } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const isOutOfStock = product.quantity <= 0;

  async function addCart() {
    try {
      setIsLoading(true);
      const cart = await getCart();
      const existingItem = (cart?.data?.products ?? []).find(
        (item: CartItem) => item.product._id === product._id,
      );

      if (existingItem) {
        await updateQuantity(product._id, existingItem.count + quantity);
      } else {
        await addToCart(product._id);
        if (quantity > 1) {
          await updateQuantity(product._id, quantity);
        }
      }

      await syncCartToRedux();
      toast.success(
        `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add the product to your cart. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={addCart}
      disabled={isLoading || isOutOfStock}
      className="h-12 w-full cursor-pointer rounded-lg bg-primary-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <>
          <Loader2 size={18} className="mr-2 animate-spin" /> Adding to cart
        </>
      ) : isOutOfStock ? (
        "Out of stock"
      ) : (
        <>
          <ShoppingCart size={18} className="mr-2" /> Add {quantity} to cart
        </>
      )}
    </Button>
  );
}
