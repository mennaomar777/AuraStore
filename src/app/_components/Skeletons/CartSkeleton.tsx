import { SkeletonBlock } from "./SkeletonPrimitives";

export default function CartSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading your cart"
      className="min-h-[60vh] bg-gray-50/70 px-5 py-8 dark:bg-gray-950 md:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <SkeletonBlock className="mb-7 h-4 w-44" />
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <SkeletonBlock className="h-8 w-56" />
            <SkeletonBlock className="h-4 w-40" />
          </div>
          <SkeletonBlock className="hidden h-4 w-36 sm:block" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <article
                key={index}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-5"
              >
                <SkeletonBlock className="h-24 w-24 shrink-0 rounded-xl sm:h-28 sm:w-28" />
                <div className="flex-1 space-y-3 py-1">
                  <SkeletonBlock className="h-4 w-3/4" />
                  <SkeletonBlock className="h-3 w-2/5" />
                  <SkeletonBlock className="h-8 w-28" />
                </div>
                <SkeletonBlock className="hidden h-5 w-16 sm:block" />
              </article>
            ))}
          </section>
          <aside className="h-fit space-y-5 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-px w-full rounded-none" />
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-12 w-full rounded-xl" />
          </aside>
        </div>
      </div>
    </main>
  );
}