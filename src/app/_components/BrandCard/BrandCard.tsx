import { getAllBrands } from "@/services/brands";
import type { Brand } from "@/types/products";
import { ArrowUpRight, BadgeCheck, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BrandCard() {
  const brands: Brand[] = await getAllBrands();

  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            The AuraStore edit
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Shop your favorite brands
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Browse official collections and discover something new.
          </p>
        </div>
        <span className="w-fit rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          {brands.length} {brands.length === 1 ? "brand" : "brands"}
        </span>
      </div>

      {brands.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800 dark:focus-visible:ring-offset-gray-950"
            >
              <div className="relative flex min-h-40 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-6 dark:bg-gray-800/70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_65%)] opacity-70 transition group-hover:opacity-100" />
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  width={160}
                  height={120}
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 18vw"
                  className="relative h-24 w-full object-contain transition duration-300 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-600 opacity-0 shadow-sm transition group-hover:opacity-100 dark:bg-gray-950 dark:text-emerald-300">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-4">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                    {brand.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Explore collection
                  </p>
                </div>
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-500/70 transition group-hover:text-emerald-600 dark:text-emerald-400" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
          <Store className="mx-auto mb-4 h-9 w-9 text-emerald-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No brands to show yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please check back soon for new brand collections.
          </p>
        </div>
      )}
    </>
  );
}

