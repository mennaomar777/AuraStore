import { ArrowRight, ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getCart } from "@/services/cart";
import CartCards from "../CartCards/CartCards";
import type { CartItem } from "@/types/cart";

export default async function Cart() {
  const cart = await getCart();
  const cartItems: CartItem[] = cart?.data?.products ?? [];
  const unitCount = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <main className="min-h-[60vh] bg-gray-50/70 px-5 py-8 dark:bg-gray-950 md:py-12">
      <div className="mx-auto max-w-7xl">
        <nav
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            Cart
          </span>
        </nav>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 dark:bg-emerald-950 dark:text-emerald-300">
                <ShoppingCart size={21} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">
                  Ready when you are
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Shopping cart
                </h1>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {unitCount} {unitCount === 1 ? "unit" : "units"} in your cart
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <CartCards cartItems={cartItems} cartId={cart.cartId} />
        ) : (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900/60">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
              <ShoppingBag size={26} />
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Take a look around and add something you’ll love. Your items will
              appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Browse products <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <ArrowLeft size={15} /> Back home
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
