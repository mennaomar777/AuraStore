import { ProductCardSkeleton, SkeletonBlock } from "./SkeletonPrimitives";

export default function ProductGridSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading product collection"
      className="min-h-screen bg-white pb-16 dark:bg-gray-950"
    >
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-500 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-7xl space-y-5">
          <SkeletonBlock className="h-3 w-28 bg-white/20 dark:bg-white/20" />
          <SkeletonBlock className="h-10 w-3/4 max-w-lg bg-white/20 dark:bg-white/20 sm:h-12" />
          <SkeletonBlock className="h-4 w-full max-w-xl bg-white/15 dark:bg-white/15" />
          <SkeletonBlock className="h-4 w-2/3 max-w-md bg-white/15 dark:bg-white/15" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-10">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-gray-100 pb-5 dark:border-gray-800">
          <div className="w-full max-w-sm space-y-3">
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-7 w-3/4" />
          </div>
          <SkeletonBlock className="hidden h-10 w-32 sm:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}