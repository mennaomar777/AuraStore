import { SkeletonBlock } from "./SkeletonPrimitives";

export default function OrdersSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading your orders"
      className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-gray-50 to-white px-3 py-6 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 min-[375px]:px-4 sm:px-6 sm:py-8 lg:py-12"
    >
      <div className="mx-auto max-w-6xl">
        <SkeletonBlock className="mb-5 h-4 w-44 sm:mb-7" />
        <section className="mb-6 flex flex-col justify-between gap-5 rounded-3xl bg-emerald-800 p-4 sm:mb-8 sm:flex-row sm:items-center sm:gap-6 sm:p-9">
          <div className="w-full max-w-md space-y-4">
            <SkeletonBlock className="h-3 w-40 bg-white/20 dark:bg-white/20" />
            <SkeletonBlock className="h-9 w-52 bg-white/20 dark:bg-white/20" />
            <SkeletonBlock className="h-4 w-full bg-white/15 dark:bg-white/15" />
          </div>
          <SkeletonBlock className="hidden h-16 w-24 bg-white/20 dark:bg-white/20 sm:block" />
        </section>
        <section className="space-y-5">
          {Array.from({ length: 3 }, (_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-4 sm:p-6">
                <div className="space-y-3">
                  <SkeletonBlock className="h-4 w-36" />
                  <SkeletonBlock className="h-3 w-52 max-w-full" />
                </div>
                <SkeletonBlock className="h-9 w-28 rounded-full" />
              </div>
              <div className="grid gap-3 border-t border-gray-100 p-4 dark:border-gray-800 sm:grid-cols-3 sm:p-6">
                <SkeletonBlock className="h-14 rounded-xl" />
                <SkeletonBlock className="h-14 rounded-xl" />
                <SkeletonBlock className="h-14 rounded-xl" />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
