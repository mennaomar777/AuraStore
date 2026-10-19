"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCardItem from "@/app/_components/ProductCardItem/ProductCardItem";
import type { Product } from "@/types/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SearchResultsProps = {
  products: Product[];
};

const paginationControlClass =
  "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border px-3 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none dark:focus-visible:ring-offset-gray-950";
const paginationPageClass =
  "hidden size-10 items-center justify-center rounded-xl border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 sm:inline-flex";

export default function SearchResults({ products }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const rawSort = searchParams.get("sort") ?? "relevance";
  const validSorts = [
    "relevance",
    "price-asc",
    "price-desc",
    "rating-desc",
    "name-asc",
    "name-desc",
  ];
  const sortBy = validSorts.includes(rawSort) ? rawSort : "relevance";
  const rawPage = searchParams.get("page");
  const parsedPage = Number(rawPage);
  const requestedPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  function replaceSearchParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParamsString);

    for (const [key, value] of Object.entries(updates)) {
      params.set(key, value);
    }

    params.set("page", "1");
    window.history.replaceState(null, "", `/search?${params.toString()}`);
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }

    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating-desc") {
      return b.ratingsAverage - a.ratingsAverage;
    }
    if (sortBy === "name-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "name-desc") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  const pageSize = 20;
  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const currentPage = Math.min(requestedPage, Math.max(1, totalPages));
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - currentPage) <= 1,
  );

  function goToPage(targetPage: number) {
    const params = new URLSearchParams(searchParamsString);
    params.set("page", String(targetPage));
    window.history.pushState(null, "", `/search?${params.toString()}`);
  }

  useEffect(() => {
    if (rawPage === null || rawPage === String(currentPage)) return;

    const params = new URLSearchParams(searchParamsString);
    params.set("page", String(currentPage));
    window.history.replaceState(null, "", `/search?${params.toString()}`);
  }, [currentPage, rawPage, searchParamsString]);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <section aria-label="Product search results" className="min-w-0">
      <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Search results
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <span className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <ArrowUpDown aria-hidden="true" className="size-3.5" />
            Sort by
          </span>
          <Select
            value={sortBy}
            onValueChange={(value) => replaceSearchParams({ sort: value })}
          >
            <SelectTrigger
              aria-label="Sort search results"
              className="h-11 w-full rounded-xl border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-primary-400 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 sm:w-52 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-primary-600"
            >
              <SelectValue placeholder="Choose order" />
            </SelectTrigger>

            <SelectContent
              position="popper"
              align="end"
              className="z-100 max-h-72 w-64 rounded-xl border border-gray-200 bg-white p-1.5 text-gray-900 shadow-xl shadow-gray-900/10 ring-1 ring-gray-200/80 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/30 dark:ring-gray-700"
            >
              <SelectItem
                value="relevance"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Relevance
              </SelectItem>
              <SelectItem
                value="price-asc"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Price: Low to High
              </SelectItem>
              <SelectItem
                value="price-desc"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Price: High to Low
              </SelectItem>
              <SelectItem
                value="rating-desc"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Rating: High to Low
              </SelectItem>
              <SelectItem
                value="name-asc"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Name: A to Z
              </SelectItem>
              <SelectItem
                value="name-desc"
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 data-highlighted:bg-primary-50 data-highlighted:text-primary-800 dark:hover:bg-primary-950/60 dark:hover:text-primary-200 dark:data-highlighted:bg-primary-950/60 dark:data-highlighted:text-primary-200"
              >
                Name: Z to A
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCardItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500 dark:text-gray-400">
          No products found.
        </p>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Search result pages"
          className="mt-8 flex items-center justify-center"
        >
          <div className="flex max-w-full items-center gap-1.5 rounded-2xl border border-gray-200 bg-gray-50/80 p-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Go to previous page"
              className={`${paginationControlClass} border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/40 dark:hover:text-primary-200 dark:disabled:border-gray-800 dark:disabled:bg-gray-900/50 dark:disabled:text-gray-600`}
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div
              role="group"
              aria-label={`Page ${currentPage} of ${totalPages}`}
              className="flex items-center gap-1"
            >
              {pageNumbers.map((number, index) => {
                const previousNumber = pageNumbers[index - 1];
                const hasGap =
                  previousNumber !== undefined && number - previousNumber > 1;

                return (
                  <span key={number} className="flex items-center gap-1">
                    {hasGap && (
                      <span
                        aria-hidden="true"
                        className="hidden px-0.5 text-gray-400 dark:text-gray-500 sm:inline"
                      >
                        …
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => goToPage(number)}
                      aria-label={`Go to page ${number}`}
                      aria-current={currentPage === number ? "page" : undefined}
                      className={`${paginationPageClass} ${
                        currentPage === number
                          ? "border-primary-600 bg-primary-600 text-white shadow-sm shadow-primary-600/20 dark:border-primary-400 dark:bg-primary-500 dark:text-gray-950"
                          : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-white hover:text-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      {number}
                    </button>
                  </span>
                );
              })}
              <span className="px-2 text-xs font-semibold text-gray-600 dark:text-gray-300 sm:hidden">
                {currentPage} / {totalPages}
              </span>
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Go to next page"
              className={`${paginationControlClass} border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/40 dark:hover:text-primary-200 dark:disabled:border-gray-800 dark:disabled:bg-gray-900/50 dark:disabled:text-gray-600`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}
