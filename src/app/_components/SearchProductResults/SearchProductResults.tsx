"use client";

import { useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import CategoryFilters from "@/app/_components/CategoryFilters/CategoryFilters";
import SearchResults from "@/app/_components/SearchResults/SearchResults";
import type { Category } from "@/types/categories";
import type { Brand, Product } from "@/types/products";
import BrandFilters from "../BrandFilters/BrandFilters";
import PriceFilter from "@/app/_components/PriceFilter/PriceFilter";

type SearchProductResultsProps = {
  categories: Category[];
  brands: Brand[];
  products: Product[];
};

export default function SearchProductResults({
  categories,
  brands,
  products,
}: SearchProductResultsProps) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  function updateSearchParams(
    updates: Record<string, string | string[] | null>,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      params.delete(key);

      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value !== null) {
        params.set(key, value);
      }
    }

    params.set("page", "1");
    window.history.replaceState(null, "", `/search?${params.toString()}`);
  }

  const minValue = minPrice === "" ? undefined : Number(minPrice);
  const maxValue = maxPrice === "" ? undefined : Number(maxPrice);

  const hasInvalidPriceRange =
    (minValue !== undefined && minValue < 0) ||
    (maxValue !== undefined && maxValue < 0) ||
    (minValue !== undefined && maxValue !== undefined && minValue > maxValue);

  function handleCategoryChange(categoryId: string) {
    const nextCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    updateSearchParams({ category: nextCategories });
  }

  function handleBrandChange(brandId: string) {
    const nextBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    updateSearchParams({ brand: nextBrands });
  }

  function getDisplayedPrice(product: Product) {
    const discountedPrice = product.priceAfterDiscount;

    if (
      typeof discountedPrice === "number" &&
      discountedPrice > 0 &&
      discountedPrice < product.price
    ) {
      return discountedPrice;
    }

    return product.price;
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category?._id ?? "");

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand?._id ?? "");

    const displayedPrice = getDisplayedPrice(product);

    const matchesPrice =
      hasInvalidPriceRange ||
      ((minValue === undefined || displayedPrice >= minValue) &&
        (maxValue === undefined || displayedPrice <= maxValue));

    return matchesCategory && matchesBrand && matchesPrice;
  });

  const hasPriceFilter = minPrice !== "" || maxPrice !== "";
  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (hasPriceFilter ? 1 : 0);

  const filterOptions = (
    <>
      <section aria-label="Filter by category">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
          Categories
        </h3>
        <CategoryFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={(value) =>
          updateSearchParams({ minPrice: value || null })
        }
        onMaxPriceChange={(value) =>
          updateSearchParams({ maxPrice: value || null })
        }
        hasInvalidRange={hasInvalidPriceRange}
      />
      <section
        aria-label="Filter by brand"
        className="mt-6 border-t border-gray-100 pt-4 dark:border-gray-800"
      >
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
          Brands
        </h3>
        <BrandFilters
          brands={brands}
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}
        />
      </section>
    </>
  );

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-6 xl:gap-8">
      <details className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:hidden dark:border-gray-800 dark:bg-gray-900">
        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
            <SlidersHorizontal aria-hidden="true" className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              Filters
            </span>
            <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
              Categories, price and brands
            </span>
          </span>
          {activeFilterCount > 0 && (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180 dark:text-gray-400"
          />
        </summary>
        <div className="max-h-[60dvh] overscroll-contain overflow-y-auto border-t border-gray-100 px-4 py-4 scrollbar-thin [scrollbar-color:#10b981_#f3f4f6] dark:border-gray-800 dark:[scrollbar-color:#10b981_#1f2937]">
          {filterOptions}
        </div>
      </details>

      <aside
        aria-label="Search filters"
        className="sticky top-6 hidden max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white p-4 shadow-sm scrollbar-thin [scrollbar-color:#10b981_#f3f4f6] lg:block dark:border-gray-800 dark:bg-gray-900 dark:[scrollbar-color:#10b981_#1f2937]"
      >
        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 text-sm font-bold text-gray-900 dark:border-gray-800 dark:text-white">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-4 text-primary-600"
          />
          Filters
        </div>
        {filterOptions}
      </aside>

      <SearchResults products={filteredProducts} />
    </div>
  );
}
