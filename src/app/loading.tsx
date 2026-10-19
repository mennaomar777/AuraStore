import { LoaderCircle, ShoppingBag, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white px-5 py-14 dark:from-emerald-950/20 dark:via-gray-950 dark:to-gray-950 sm:py-20"
      role="status"
      aria-live="polite"
      aria-label="Loading AuraStore"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl dark:bg-lime-500/10" />

      <div className="relative w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <ShoppingBag size={28} strokeWidth={1.8} />
            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-white text-emerald-600 dark:border-gray-950 dark:bg-gray-950">
              <LoaderCircle size={18} className="animate-spin" />
            </span>
          </div>
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            <Sparkles size={14} /> AuraStore
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Getting things ready
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            We’re loading the details for you. This should only take a moment.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200/80 bg-white/90 p-5 shadow-xl shadow-gray-900/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-black/20 sm:p-7">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="h-3 w-2/5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-3/5 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div className="mb-3 aspect-[4/3] animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
                <div className="mb-2 h-2.5 w-4/5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-2.5 w-2/5 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800" />
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs font-medium text-gray-400 dark:text-gray-300">
            Loading your store experience…
          </p>
        </div>
      </div>
    </main>
  );
}