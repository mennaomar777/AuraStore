import { SkeletonBlock } from "./SkeletonPrimitives";

type CollectionGridSkeletonProps = {
  kind: "category" | "brand";
};

export default function CollectionGridSkeleton({
  kind,
}: CollectionGridSkeletonProps) {
  const itemLabel = kind === "brand" ? "brand collection" : "categories";

  return (
    <main
      aria-busy="true"
      aria-label={`Loading ${itemLabel}`}
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
        <div className="mb-7 space-y-3 border-b border-gray-100 pb-5 dark:border-gray-800">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="h-7 w-64 max-w-full" />
          <SkeletonBlock className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <SkeletonBlock
                className={
                  kind === "brand"
                    ? "mx-auto my-8 h-32 w-32 rounded-2xl sm:h-36 sm:w-36"
                    : "aspect-[4/3] w-full rounded-2xl"
                }
              />
              <div className="space-y-3 p-3">
                <SkeletonBlock className="h-4 w-3/5" />
                <SkeletonBlock className="h-3 w-4/5" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}