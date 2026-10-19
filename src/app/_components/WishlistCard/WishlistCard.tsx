"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart";
import { Check, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlistActions } from "@/hooks/useWishlistActions";
import { useCart } from "@/hooks/useCart";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import type { WishlistItem } from "@/types/wishlist";

export default function WishlistCard({ item }: { item: WishlistItem }) {
  const router = useRouter();
  const [removeLoading, setRemoveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { syncCartToRedux } = useCart();
  const { remove } = useWishlistActions();
  const hasDiscount =
    typeof item.priceAfterDiscount === "number" &&
    item.priceAfterDiscount > 0 &&
    item.priceAfterDiscount < item.price;

  async function handleAddToCart() {
    try {
      setAddLoading(true);
      const res = await addToCart(item._id);
      await syncCartToRedux();
      toast.success(res.message || "Added to cart");
      setIsInCart(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart",
      );
    } finally {
      setAddLoading(false);
    }
  }

  async function handleRemove(): Promise<boolean> {
    setRemoveLoading(true);
    try {
      return await remove(item);
    } finally {
      setRemoveLoading(false);
    }
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <Image
            src={item.imageCover}
            alt={item.title}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            {item.category.name}
          </p>
          <h2 className="line-clamp-2 font-semibold leading-6 text-gray-900 dark:text-white">
            {item.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-bold text-gray-900 dark:text-white">
              {hasDiscount ? item.priceAfterDiscount : item.price} EGP
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {item.price} EGP
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-end gap-4 border-t border-gray-100 pt-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${isInCart ? "bg-primary-100/50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"}`}
        >
          {isInCart ? (
            <ShoppingCart size={13} />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          )}
          {isInCart ? "In cart" : "In stock"}
        </span>

        <div className="flex items-center gap-2">
          {isInCart ? (
            <Button
              type="button"
              onClick={() => router.push("/cart")}
              className="flex-1 cursor-pointer rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:flex-none"
            >
              <Check size={15} className="mr-1.5 text-primary-600" /> View cart
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={addLoading}
              className="flex-1 cursor-pointer rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:cursor-not-allowed sm:flex-none"
            >
              {addLoading ? (
                <>
                  <Loader2 size={15} className="mr-1.5 animate-spin" /> Adding
                </>
              ) : (
                <>
                  <ShoppingCart size={15} className="mr-1.5" /> Add to cart
                </>
              )}
            </Button>
          )}
          <ConfirmDeleteDialog
            itemName={item.title}
            description="This removes the product from your wishlist. You can add it again at any time."
            onConfirm={handleRemove}
            trigger={
              <Button
                type="button"
                disabled={removeLoading}
                variant="outline"
                size="icon"
                aria-label={`Remove ${item.title} from wishlist`}
                title="Remove from wishlist"
                className="h-10 w-10 shrink-0 cursor-pointer rounded-xl border-gray-200 text-gray-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-gray-700 dark:hover:bg-rose-950/30 disabled:cursor-not-allowed"
              >
                {removeLoading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
              </Button>
            }
          />
        </div>
      </div>
    </article>
  );
}
