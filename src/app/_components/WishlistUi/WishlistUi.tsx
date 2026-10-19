"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import WishlistCard from "../WishlistCard/WishlistCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { WishlistItem } from "@/types/wishlist";

export default function WishlistUi() {
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <main className="min-h-[60vh] bg-gray-50/70 px-5 py-8 dark:bg-gray-950 md:py-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-primary-600">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">Wishlist</span>
        </nav>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
                <Heart size={21} className="fill-current" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">
                  Saved for later
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My wishlist</h1>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep the products you love close by.
            </p>
          </div>
          <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800">
            {items.length} {items.length === 1 ? "saved item" : "saved items"}
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item: WishlistItem) => (
              <WishlistCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900/60">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/50 dark:text-rose-300">
              <Heart size={26} />
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your wishlist is empty</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Save products you like and they’ll be waiting here when you’re ready.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              <ShoppingBag size={16} /> Browse products <ArrowRight size={16} />
            </Link>
          </section>
        )}

        {items.length > 0 && (
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ArrowRight size={16} /> Continue shopping
          </Link>
        )}
      </div>
    </main>
  );
}
