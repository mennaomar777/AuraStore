import { ArrowDown, ArrowRight, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/types/products";
import { Pagination } from "../Pagination/Pagination";

type PaginationInfo = {
  pathname: string;
  page: number;
  totalPages: number;
};

type SearchParams = Record<string, string | string[] | undefined>;

type ShopProps = {
  products: Product[];
  pagination: PaginationInfo;
  searchParams: SearchParams;
};

export default function Shop({
  products,
  pagination,
  searchParams,
}: ShopProps) {
  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_52%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-lime-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <nav
            className="mb-8 flex items-center gap-2 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Shop</span>
          </nav>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} /> THE AURASTORE COLLECTION
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                Find your next{" "}
                <span className="text-emerald-100">favorite</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Browse everyday essentials and thoughtful finds, all selected to
                make shopping simple.
              </p>
              <a
                href="#shop-products"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Explore products <ArrowDown size={16} />
              </a>
            </div>

            <div className="hidden h-36 w-36 items-center justify-center rounded-4xl border border-white/20 bg-white/10 shadow-2xl shadow-emerald-950/20 backdrop-blur sm:flex md:h-44 md:w-44">
              <Package
                className="h-16 w-16 text-white/90 md:h-20 md:w-20"
                strokeWidth={1.25}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="shop-products"
        className="mx-auto max-w-7xl px-5 pt-10 md:pt-14"
      >
        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              Made for your everyday
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Browse all products
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Find something useful, delightful, or a little bit of both.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Shop by category <ArrowRight size={16} />
          </Link>
        </div>
        <ProductCard products={products} />
        <Pagination
          pathname={pagination.pathname}
          page={pagination.page}
          totalPages={pagination.totalPages}
          searchParams={searchParams}
        />
      </section>
    </main>
  );
}
