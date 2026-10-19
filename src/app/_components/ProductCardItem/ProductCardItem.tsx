"use client";

import type { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Loader2, Plus } from "lucide-react";
import Rating from "../Rating/Rating";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlistActions } from "@/hooks/useWishlistActions";
import { useCart } from "@/hooks/useCart";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";

export default function ProductCardItem({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const { add, remove, isInWishlist } = useWishlistActions();
  const active = isInWishlist(product._id);
  const { syncCartToRedux } = useCart();
  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount > 0 &&
    product.priceAfterDiscount < product.price;
  const isOutOfStock = product.quantity <= 0;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceAfterDiscount! / product.price) * 100)
    : 0;

  async function cartAdd(productId: string) {
    try {
      setIsLoading(true);
      const res = await addToCart(productId);
      await syncCartToRedux();
      toast.success(res.message || "Added to cart");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Product not added to your cart. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="flex h-full min-h-100 flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900">
        <Link
          href={`/products/${product._id}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 420px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-contain p-4 transition duration-500 hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {active ? (
            <ConfirmDeleteDialog
              itemName={product.title}
              description="This removes the product from your wishlist. You can add it again at any time."
              onConfirm={() => remove(product)}
              trigger={
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Remove ${product.title} from wishlist`}
                  title="Remove from wishlist"
                  className="h-9 w-9 cursor-pointer rounded-full bg-white text-rose-500 shadow-sm transition hover:bg-rose-50 dark:bg-gray-950 dark:hover:bg-gray-800"
                >
                  <Heart size={17} className="fill-current" />
                </Button>
              }
            />
          ) : (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Add to wishlist"
              title="Add to wishlist"
              onClick={() => void add(product)}
              className="h-9 w-9 cursor-pointer rounded-full bg-white text-gray-500 shadow-sm transition hover:bg-white hover:text-rose-500 dark:bg-gray-950 dark:hover:bg-gray-800"
            >
              <Heart size={17} />
            </Button>
          )}
          <Link
            href={`/products/${product._id}`}
            aria-label={`View ${product.title}`}
            title="View product"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:text-primary-600 dark:bg-gray-950 dark:text-gray-300 dark:hover:text-primary-400"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {product.category.name}
        </p>
        <Link href={`/products/${product._id}`} className="mt-1">
          <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 text-gray-900 transition hover:text-primary-700 dark:text-white dark:hover:text-primary-400">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <Rating value={product.ratingsAverage} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-4">
          <div className="min-w-0 flex-1">
            {hasDiscount ? (
              <>
                <span className="block truncate text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                  {product.priceAfterDiscount}{" "}
                  <span className="text-xs font-semibold sm:text-sm">EGP</span>
                </span>
                <span className="block truncate text-xs text-gray-400 line-through">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="block truncate text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                {product.price}{" "}
                <span className="text-xs font-semibold sm:text-sm">EGP</span>
              </span>
            )}
          </div>

          <Button
            type="button"
            aria-label={
              isOutOfStock
                ? `${product.title} is unavailable`
                : `Add ${product.title} to cart`
            }
            title={isOutOfStock ? "Unavailable" : "Add to cart"}
            onClick={() => cartAdd(product._id)}
            disabled={isLoading || isOutOfStock}
            className="size-10 shrink-0 cursor-pointer rounded-full bg-primary-600 p-0 text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Plus size={18} />}
          </Button>
        </div>
      </div>
    </article>
  );
}

