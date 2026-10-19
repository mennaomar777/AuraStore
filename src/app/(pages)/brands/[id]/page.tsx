import { getBrandDetails } from "@/services/brands";
import { getProductsPage } from "@/services/products";
import type { Brand } from "@/types/products";
import ProductCardItem from "@/app/_components/ProductCardItem/ProductCardItem";
import { ArrowDown, ArrowLeft, PackageSearch, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/app/_components/Pagination/Pagination";
import { parsePage } from "@/lib/pagination";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BrandDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const queryParams = await searchParams;

  const page = parsePage(queryParams.page);

  const [brandResponse, productsResponse] = await Promise.all([
    getBrandDetails(id),
    getProductsPage(page, 20, undefined, id),
  ]);

  const brand: Brand = brandResponse;
  const brandProducts = productsResponse.products;

  if (productsResponse.totalPages > 0 && page > productsResponse.totalPages) {
    redirect(`/brands/${id}?page=${productsResponse.totalPages}`);
  }

  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_48%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-7 md:pb-16">
          <nav
            className="mb-9 flex items-center gap-2 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/brands" className="transition hover:text-white">
              Brands
            </Link>
            <span>/</span>
            <span className="font-medium text-white">{brand.name}</span>
          </nav>

          <div className="grid items-center gap-9 md:grid-cols-[minmax(0,1fr)_260px] md:gap-12">
            <div className="order-2 md:order-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} />
                OFFICIAL BRAND COLLECTION
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                {brand.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Explore products from {brand.name}, selected for quality,
                performance, and everyday value.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#brand-products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  Explore collection <ArrowDown size={16} />
                </a>
                <span className="text-sm text-white/75">
                  Page {productsResponse.page} of {productsResponse.totalPages}
                </span>
              </div>
            </div>

            <div className="order-1 mx-auto flex h-44 w-44 items-center justify-center rounded-4xl border border-white/60 bg-white p-6 shadow-2xl shadow-emerald-950/25 md:order-2 md:h-60 md:w-60 md:p-9">
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                width={220}
                height={220}
                priority
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="brand-products"
        className="mx-auto max-w-7xl px-5 pt-10 md:pt-14"
      >
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/brands"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            >
              <ArrowLeft size={15} /> All brands
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Shop{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {brand.name}
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse the full collection from this brand.
            </p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {brandProducts.length} on this page
          </span>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brandProducts.map((product) => (
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
              We don’t have any {brand.name} products to show right now. Browse
              other brands while we update the collection.
            </p>
            <Link
              href="/brands"
              className="mt-5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Browse all brands
            </Link>
          </div>
        )}

        {brandProducts.length > 0 && (
          <Pagination
            pathname={`/brands/${id}`}
            page={productsResponse.page}
            totalPages={productsResponse.totalPages}
            searchParams={queryParams}
          />
        )}
      </section>
    </main>
  );
}
