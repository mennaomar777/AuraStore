"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, House, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-white px-5 py-16 dark:from-rose-950/10 dark:via-gray-950 dark:to-gray-950 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/25 blur-3xl dark:bg-rose-500/10" />

      <section
        role="alert"
        className="w-full max-w-xl rounded-3xl border border-gray-200/80 bg-white/90 p-7 text-center shadow-xl shadow-gray-900/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-black/20 sm:p-12"
      >
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          <AlertTriangle size={36} strokeWidth={1.7} />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
          A little hiccup
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          We couldn’t load this page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
          Something went wrong while loading this part of AuraStore. Please try
          again, or head back to the home page.
        </p>

        {error.digest && (
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-300">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <RefreshCw size={17} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30"
          >
            <ArrowLeft size={17} />
            <House size={16} />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}