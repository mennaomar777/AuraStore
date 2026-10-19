import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  pathname: string;
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

function pageHref(
  targetPage: number,
  searchParams: PaginationProps["searchParams"],
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;

    for (const item of Array.isArray(value) ? value : [value]) {
      params.append(key, item);
    }
  }

  params.set("page", String(targetPage));

  return `${pathnameForQuery(params)}`;
}

function pathnameForQuery(params: URLSearchParams) {
  return `?${params.toString()}`;
}

export function Pagination({
  pathname,
  page,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  const previousHref = `${pathname}${pageHref(previousPage, searchParams)}`;
  const nextHref = `${pathname}${pageHref(nextPage, searchParams)}`;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - page) <= 1,
  );

  const controlClass =
    "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950";
  const enabledClass =
    "border-gray-200 bg-white text-gray-700 shadow-sm hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/40 dark:hover:text-primary-200";
  const disabledClass =
    "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600";
  const pageLinkClass =
    "hidden size-10 items-center justify-center rounded-xl border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 sm:inline-flex";

  return (
    <nav
      aria-label="Product pages"
      className="mt-8 flex items-center justify-center"
    >
      <div className="flex max-w-full items-center gap-1.5 rounded-2xl border border-gray-200 bg-gray-50/80 p-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:gap-2">
        {page <= 1 ? (
          <span
            aria-disabled="true"
            className={`${controlClass} ${disabledClass}`}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        ) : (
          <Link
            href={previousHref}
            rel="prev"
            className={`${controlClass} ${enabledClass}`}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        )}

        <div
          role="group"
          aria-label={`Page ${page} of ${totalPages}`}
          className="flex items-center gap-1"
        >
          {pageNumbers.map((number, index) => {
            const previousNumber = pageNumbers[index - 1];
            const hasGap =
              previousNumber !== undefined && number - previousNumber > 1;

            return (
              <span key={number} className="flex items-center gap-1">
                {hasGap && (
                  <span
                    aria-hidden="true"
                    className="hidden px-0.5 text-gray-400 dark:text-gray-500 sm:inline"
                  >
                    …
                  </span>
                )}
                <Link
                  href={`${pathname}${pageHref(number, searchParams)}`}
                  aria-label={`Go to page ${number}`}
                  aria-current={page === number ? "page" : undefined}
                  className={`${pageLinkClass} ${
                    page === number
                      ? "border-primary-600 bg-primary-600 text-white shadow-sm shadow-primary-600/20 dark:border-primary-400 dark:bg-primary-500 dark:text-gray-950"
                      : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-white hover:text-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {number}
                </Link>
              </span>
            );
          })}
          <span className="px-2 text-xs font-semibold text-gray-600 dark:text-gray-300 sm:hidden">
            {page} / {totalPages}
          </span>
        </div>

        {page >= totalPages ? (
          <span
            aria-disabled="true"
            className={`${controlClass} ${disabledClass}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight aria-hidden="true" className="size-4" />
          </span>
        ) : (
          <Link
            href={nextHref}
            rel="next"
            className={`${controlClass} ${enabledClass}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight aria-hidden="true" className="size-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
