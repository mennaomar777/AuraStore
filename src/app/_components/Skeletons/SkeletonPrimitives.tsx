type SkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <SkeletonBlock className="aspect-square w-full rounded-xl" />
      <div className="space-y-3 p-2 pt-4">
        <SkeletonBlock className="h-3 w-1/3" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-3 w-2/5" />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBlock className="h-5 w-1/3" />
          <SkeletonBlock className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </article>
  );
}