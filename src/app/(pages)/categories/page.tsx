import { getAllCategories } from "@/services/categories";
import type { Category } from "@/types/categories";
import { ArrowRight, Shapes, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories();

  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_52%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <nav
            className="mb-8 flex items-center gap-2 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Categories</span>
          </nav>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} /> FIND YOUR NEXT FAVORITE
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                Shop by <span className="text-emerald-100">category</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Explore the collections you love, from everyday essentials to
                the latest finds, all in one place.
              </p>
            </div>

            <div className="hidden h-36 w-36 items-center justify-center rounded-4xl border border-white/20 bg-white/10 shadow-2xl shadow-purple-950/20 backdrop-blur sm:flex md:h-44 md:w-44">
              <Shapes
                className="h-16 w-16 text-white/90 md:h-20 md:w-20"
                strokeWidth={1.25}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 md:pt-14">
        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 dark:border-gray-800 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              The AuraStore edit
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Explore our collections
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose a category to discover products picked for you.
            </p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </span>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="group relative isolate min-h-64 overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/10 dark:bg-gray-900 dark:ring-white/10"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-950/85 via-gray-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      Explore collection
                    </p>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {category.name}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg transition duration-300 group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white">
                    <ArrowRight size={19} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/40">
            <Shapes className="mx-auto mb-4 h-9 w-9 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No categories to show yet
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please check back soon for new collections.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
