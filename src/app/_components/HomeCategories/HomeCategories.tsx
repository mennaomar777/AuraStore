import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HomeCategoryCard from "../HomeCategoryCard/HomeCategoryCard";

export default function HomeCategories() {
  return (
    <section className="bg-white py-12 transition-colors dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-9">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Find what you need
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Shop by <span className="text-primary-600 dark:text-primary-400">category</span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse collections made for every part of your day.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex w-fit items-center gap-1 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View all categories <ArrowRight size={16} />
          </Link>
        </div>

        <HomeCategoryCard />
      </div>
    </section>
  );
}
