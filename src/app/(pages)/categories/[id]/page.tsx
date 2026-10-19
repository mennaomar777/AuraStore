import { getCategoryDetails } from "@/services/categories";
import { getProductsPage } from "@/services/products";
import ProductCardItem from "@/app/_components/ProductCardItem/ProductCardItem";
import type { Category, SubCategory } from "@/types/categories";
import type { Product } from "@/types/products";
import { ArrowDown, ArrowLeft, PackageSearch, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSubCategoriesByCategory } from "@/services/subCategories";
import { Pagination } from "@/app/_components/Pagination/Pagination";
import { parsePage } from "@/lib/pagination";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const queryParams = await searchParams;

  const page = parsePage(queryParams.page);

  const [categoryDetails, productsResult, subCategories] = await Promise.all([
    getCategoryDetails(id),
    getProductsPage(page, 20, id),
    getSubCategoriesByCategory(id),
  ]);

  const category: Category = categoryDetails;
  const categoryProducts = productsResult.products;

  if (productsResult.totalPages > 0 && page > productsResult.totalPages) {
    redirect(`/categories/${id}?page=${productsResult.totalPages}`);
  }

  const categorySubCategories = subCategories.filter(
    (subCategory: SubCategory) => subCategory.category === category._id,
  );

  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_48%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-7 md:pb-16">
          <nav
            className="mb-9 flex items-center gap-2 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="transition hover:text-white">
              Categories
            </Link>
            <span>/</span>
            <span className="font-medium text-white">{category.name}</span>
          </nav>

          <div className="grid items-center gap-9 md:grid-cols-[minmax(0,1fr)_260px] md:gap-12">
            <div className="order-2 md:order-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} /> CATEGORY COLLECTION
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Discover products selected from our {category.name} collection.
                Find something you’ll love for your everyday needs.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#category-products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  Explore collection <ArrowDown size={16} />
                </a>
                <span className="text-sm text-white/75">
                  Page {productsResult.page} of {productsResult.totalPages}
                </span>
              </div>
            </div>

            <div className="order-1 mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-4xl border border-white/60 bg-white p-2 shadow-2xl shadow-emerald-950/25 md:order-2 md:h-60 md:w-60 md:p-3">
              <Image
                src={category.image}
                alt={category.name}
                width={240}
                height={240}
                priority
                className="h-full w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Browse subcategories
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {categorySubCategories.length} subcategories
        </p>

        {categorySubCategories.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {categorySubCategories.map((subcategory: SubCategory) => (
              <Link
                href={`/subcategories/${subcategory._id}`}
                key={subcategory._id}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
            No subcategories are available for this category yet.
          </p>
        )}
      </section>

      <section
        id="category-products"
        className="mx-auto max-w-7xl px-5 pt-10 md:pt-14"
      >
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/categories"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            >
              <ArrowLeft size={15} /> All categories
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Shop{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {category.name}
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse the products in this collection.
            </p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {categoryProducts.length} on this page
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categoryProducts.map((product: Product) => (
              <ProductCardItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-900/40">
            <div className="mb-4 rounded-2xl bg-emerald-100 p-4 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <PackageSearch size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No products available yet
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              We don’t have any {category.name} products to show right now.
              Browse other categories while we update the collection.
            </p>
            <Link
              href="/categories"
              className="mt-5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Browse all categories
            </Link>
          </div>
        )}

        <Pagination
          pathname={`/categories/${id}`}
          page={productsResult.page}
          totalPages={productsResult.totalPages}
          searchParams={queryParams}
        />
      </section>
    </main>
  );
}
