import { SkeletonBlock } from "./SkeletonPrimitives";

export default function ProductDetailsSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading product details"
      className="mx-auto min-h-screen max-w-7xl px-5 pb-16 pt-8"
    >
      <SkeletonBlock className="mb-8 h-4 w-44" />
      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-6 xl:gap-8">
        <SkeletonBlock className="h-[300px] w-full rounded-3xl sm:h-[360px] lg:h-[380px]" />
        <div className="space-y-6 py-2">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-9 w-4/5" />
          <SkeletonBlock className="h-4 w-36" />
          <SkeletonBlock className="h-8 w-40" />
          <div className="space-y-3 border-y border-gray-100 py-6 dark:border-gray-800">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
          <SkeletonBlock className="h-12 w-full max-w-sm rounded-xl" />
          <div className="flex gap-3">
            <SkeletonBlock className="h-11 w-32 rounded-xl" />
            <SkeletonBlock className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </section>
      <section className="mt-14 rounded-2xl border border-gray-200 p-5 dark:border-gray-800 sm:p-7">
        <div className="mb-6 flex gap-5 border-b border-gray-100 pb-4 dark:border-gray-800">
          <SkeletonBlock className="h-8 w-28" />
          <SkeletonBlock className="h-8 w-24" />
          <SkeletonBlock className="h-8 w-32" />
        </div>
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="mt-4 h-4 w-full" />
        <SkeletonBlock className="mt-2 h-4 w-4/5" />
      </section>
    </main>
  );
}
