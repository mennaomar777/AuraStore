import { getAllProducts } from "@/services/products";
import type { Product } from "@/types/products";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { getAllCategories } from "@/services/categories";
import { getAllBrands } from "@/services/brands";
import SearchProductResults from "@/app/_components/SearchProductResults/SearchProductResults";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);
  const allProducts = query ? await getAllProducts() : [];

  const products = allProducts.filter((product: Product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-50/80 pb-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-9">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          <Link
            href="/"
            className="transition hover:text-primary-700 dark:hover:text-primary-400"
          >
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <Link
            href="/products"
            className="transition hover:text-primary-700 dark:hover:text-primary-400"
          >
            Shop
          </Link>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <span className="text-gray-900 dark:text-white">Search results</span>
        </nav>

        <header className="mb-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-400">
                AuraStore search
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                {query ? "Search results" : "Find your next favorite"}
              </h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {query
                  ? `Showing matches for “${query}”`
                  : "Explore products from across our store."}
              </p>
            </div>

            <div className="flex min-h-11 min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 sm:w-80 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-primary-600"
              />
              <span className="truncate">{query || "Search products..."}</span>
            </div>
          </div>
        </header>

        {!query ? (
          <section aria-label="Product search results" className="min-w-0">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
              <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
                <Search className="size-5" />
              </span>

              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                Start with a search
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                Enter a product name in the search bar above to find something
                you’ll love.
              </p>
            </div>
          </section>
        ) : (
          <SearchProductResults
            categories={categories}
            brands={brands}
            products={products}
          />
        )}
      </div>
    </main>
  );
}
