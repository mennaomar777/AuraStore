import Link from "next/link";
import { House, SearchX, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white px-5 py-16 dark:from-emerald-950/20 dark:via-gray-950 dark:to-gray-950 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

      <section className="w-full max-w-xl rounded-3xl border border-gray-200/80 bg-white/90 p-7 text-center shadow-xl shadow-gray-900/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-black/20 sm:p-12">
        <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
          <SearchX size={42} strokeWidth={1.5} />
          <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white dark:border-gray-900">
            <ShoppingBag size={15} />
          </span>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
          The page may have moved, or the address may be incorrect. Let’s get
          you back to browsing AuraStore.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <House size={17} />
            Back to home
          </Link>
          <Link
            href="/products"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30"
          >
            <ShoppingBag size={17} />
            Browse products
          </Link>
        </div>
      </section>
    </main>
  );
}
