"use client";

import QuantitySelector from "@/app/_components/QuantitySelector/QuantitySelector";
import Rating from "@/app/_components/Rating/Rating";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products";
import { ArrowLeft, RotateCcw, Share2, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import ProductImagesSwiper from "../ProductImagesSwiper/ProductImagesSwiper";
import WishlistBtn from "../WishlistBtn/WishlistBtn";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount > 0 &&
    product.priceAfterDiscount < product.price;
  const unitPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const isOutOfStock = product.quantity <= 0;
  const discountPercent = hasDiscount
    ? Math.round((1 - unitPrice / product.price) * 100)
    : 0;

  async function shareProduct() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Could not share this product");
      }
    }
  }

  return (
    <main className="mx-auto max-w-7xl py-7 md:py-10">
      <nav
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="transition hover:text-primary-700 dark:hover:text-primary-400"
        >
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="transition hover:text-primary-700 dark:hover:text-primary-400"
        >
          Shop
        </Link>
        <span>/</span>
        <span className="max-w-[55vw] truncate font-medium text-gray-800 dark:text-gray-200">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-6 xl:gap-8">
        <section className="min-w-0 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-4 lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-400">
              Product gallery
            </span>
            {hasDiscount && (
              <span className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white">
                Save {discountPercent}%
              </span>
            )}
          </div>
          <ProductImagesSwiper
            images={
              product.images?.length ? product.images : [product.imageCover]
            }
          />
        </section>

        <section className="min-w-0 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/categories/${product.category._id}`}
              className="rounded-full border border-transparent bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-800 transition hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-primary-800 dark:bg-primary-950/70 dark:text-primary-200 dark:hover:border-primary-700 dark:hover:bg-primary-100/20 dark:hover:text-primary-300 dark:focus-visible:ring-offset-gray-900"
            >
              {product.category.name}
            </Link>
            <Link
              href={`/brands/${product.brand._id}`}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {product.brand.name}
            </Link>
          </div>

          <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-950 dark:text-white sm:text-3xl lg:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Rating value={product.ratingsAverage} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {product.ratingsAverage.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
              {unitPrice} EGP
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${isOutOfStock ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${isOutOfStock ? "bg-rose-500" : "bg-emerald-500"}`}
            />
            {isOutOfStock ? "Out of stock" : "In stock"}
            {!isOutOfStock && (
              <span className="font-normal opacity-80">
                · {product.quantity} available
              </span>
            )}
          </div>

          <div className="my-6 border-t border-gray-100 dark:border-gray-800" />
          <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            About this product
          </h2>
          <p className="max-h-36 overflow-y-auto whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70 sm:p-4">
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              max={product.quantity}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Quantity
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-primary-100 bg-primary-50/70 px-4 py-4 dark:border-primary-900/50 dark:bg-primary-950/30 sm:px-5">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total price
            </span>
            <span className="text-xl font-bold text-primary-800 dark:text-primary-300 sm:text-2xl">
              {(unitPrice * quantity).toLocaleString()} EGP
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <AddToCartBtn product={product} quantity={quantity} />
            <div className="flex gap-3">
              <WishlistBtn product={product} />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={shareProduct}
                aria-label="Share product"
                title="Share product"
                className="h-12 w-12 shrink-0 rounded-xl border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 dark:border-gray-700 dark:text-gray-300 dark:hover:text-primary-300"
              >
                <Share2 size={19} />
              </Button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-2.5 border-t border-gray-100 pt-5 dark:border-gray-800 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-950/40">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100/70 dark:bg-emerald-900/70"
              >
                <Truck
                  className="h-5 w-5 text-primary-700 dark:text-emerald-200"
                  strokeWidth={2.25}
                />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  Free delivery
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-gray-600 dark:text-gray-300">
                  Orders over 500 EGP
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-950/40">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100/70 dark:bg-emerald-900/70"
              >
                <RotateCcw
                  className="h-5 w-5 text-primary-700 dark:text-emerald-200"
                  strokeWidth={2.25}
                />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  Easy returns
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-gray-600 dark:text-gray-300">
                  14-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-950/40">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100/70 dark:bg-emerald-900/70"
              >
                <ShieldCheck
                  className="h-5 w-5 text-primary-700 dark:text-emerald-200"
                  strokeWidth={2.25}
                />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  Secure payment
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-gray-600 dark:text-gray-300">
                  Protected checkout
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-300"
          >
            <ArrowLeft size={15} /> Back to shop
          </Link>
        </section>
      </div>
    </main>
  );
}
