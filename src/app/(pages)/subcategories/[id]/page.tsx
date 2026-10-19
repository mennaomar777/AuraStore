import ProductCardItem from "@/app/_components/ProductCardItem/ProductCardItem";
import { getAllProducts } from "@/services/products";
import { getSpecificSubCategory } from "@/services/subCategories";
import type { Product } from "@/types/products";
import { ArrowLeft, PackageSearch, Sparkles } from "lucide-react";
import Link from "next/link";
import { parsePage } from "@/lib/pagination";
import { Pagination } from "@/app/_components/Pagination/Pagination";
import { redirect } from "next/navigation";

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, queryParams] = await Promise.all([params, searchParams]);
  const page = parsePage(queryParams.page);

  const [specificSubCategoryDetails, products] = await Promise.all([
    getSpecificSubCategory(id),
    getAllProducts(),
  ]);

  const subCategoryProducts = products.filter((product: Product) =>
    product.subcategory?.some(
      (subcategory) => subcategory._id === specificSubCategoryDetails._id,
    ),
  );
  const pageSize = 20;
  const totalPages = Math.ceil(subCategoryProducts.length / pageSize);

  if (totalPages > 0 && page > totalPages) {
    redirect(`/subcategories/${id}?page=${totalPages}`);
  }

  const visibleProducts = subCategoryProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_48%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 md:py-12">
          <nav
            className="mb-8 flex items-center gap-2 text-sm text-white/70"
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
            <span className="font-medium text-white">
              {specificSubCategoryDetails.name}
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
              <Sparkles size={14} /> SUBCATEGORY COLLECTION
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {specificSubCategoryDetails.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Explore products from our {specificSubCategoryDetails.name}{" "}
              collection.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 md:pt-14">
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
          <div>
            <Link
              href={`/categories/${specificSubCategoryDetails.category}`}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            >
              <ArrowLeft size={15} /> Back to category
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Shop{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {specificSubCategoryDetails.name}
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse products in this collection.
            </p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {subCategoryProducts.length}{" "}
            {subCategoryProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {subCategoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product: Product) => (
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
              There are no {specificSubCategoryDetails.name} products to show
              right now.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            pathname={`/subcategories/${id}`}
            page={page}
            totalPages={totalPages}
            searchParams={queryParams}
          />
        )}
      </section>
    </main>
  );
}
