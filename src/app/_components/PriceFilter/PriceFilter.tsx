"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

type PriceFilterProps = {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  hasInvalidRange: boolean;
};

const pricePresets = [
  { label: "Under 500", value: 500 },
  { label: "Under 1K", value: 1000 },
  { label: "Under 5K", value: 5000 },
  { label: "Under 10K", value: 10000 },
];

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  hasInvalidRange,
}: PriceFilterProps) {
  return (
    <section
      aria-label="Filter by price"
      className="mt-6 border-t border-gray-100 pt-4 dark:border-gray-800"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
            Price range
          </h3>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            Set a minimum or maximum
          </p>
        </div>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          EGP
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <label htmlFor="min-price" className="min-w-0 space-y-1.5">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            Minimum
          </span>
          <div className="relative">
            <Input
              id="min-price"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={minPrice}
              onChange={(event) => onMinPriceChange(event.target.value)}
              placeholder="0"
              aria-label="Minimum price"
              aria-invalid={hasInvalidRange}
              aria-describedby={
                hasInvalidRange ? "price-range-error" : undefined
              }
              className="h-10 rounded-xl border-gray-200 bg-gray-50 pr-3 text-sm text-gray-900 shadow-none transition placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/15 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </label>

        <label htmlFor="max-price" className="min-w-0 space-y-1.5">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            Maximum
          </span>
          <div className="relative">
            <Input
              id="max-price"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(event.target.value)}
              placeholder="Any"
              aria-label="Maximum price"
              aria-invalid={hasInvalidRange}
              aria-describedby={
                hasInvalidRange ? "price-range-error" : undefined
              }
              className="h-10 rounded-xl border-gray-200 bg-gray-50 pr-3 text-sm text-gray-900 shadow-none transition placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/15 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </label>
      </div>

      <div
        aria-label="Quick price filters"
        className="mt-3 flex flex-wrap gap-2"
      >
        {pricePresets.map((preset) => {
          const isActive =
            minPrice === "" && maxPrice === String(preset.value);

          return (
            <button
              key={preset.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                if (isActive) {
                  onMaxPriceChange("");
                  return;
                }

                onMinPriceChange("");
                onMaxPriceChange(String(preset.value));
              }}
              className={`cursor-pointer rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-primary-950/60 dark:hover:text-primary-200"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {hasInvalidRange && (
        <p
          id="price-range-error"
          className="mt-2.5 flex items-start gap-1.5 text-xs leading-5 text-red-600 dark:text-red-400"
          role="alert"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-3.5 shrink-0"
          />
          <span>Enter a valid range: minimum must not exceed maximum.</span>
        </p>
      )}
    </section>
  );
}
