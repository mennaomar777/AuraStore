import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/services/categories";
import type { Category } from "@/types/categories";

export default async function HomeCategoryCard() {
  const allCategories: Category[] = await getAllCategories();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {allCategories.map((category) => (
        <Link
          href={`/categories/${category._id}`}
          key={category._id}
          className="group relative isolate min-h-44 overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-900 dark:ring-white/10 dark:focus-visible:ring-offset-gray-950 sm:min-h-52"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="-z-20 object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-950/80 via-gray-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
            <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
              {category.name}
            </h3>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary-700 shadow-sm transition group-hover:bg-primary-600 group-hover:text-white sm:h-9 sm:w-9">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
