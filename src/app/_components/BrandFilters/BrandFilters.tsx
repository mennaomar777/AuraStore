"use client";

import type { Brand } from "@/types/products";

type BrandFiltersProps = {
  brands: Brand[];
  selectedBrands: string[];
  onBrandChange: (brandId: string) => void;
};

export default function BrandFilters({
  brands,
  selectedBrands,
  onBrandChange,
}: BrandFiltersProps) {
  return (
    <div>
      {brands.map((brand) => (
        <label
          key={brand._id}
          className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm"
        >
          <input
            type="checkbox"
            className="size-4 shrink-0 cursor-pointer accent-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            checked={selectedBrands.includes(brand._id)}
            onChange={() => onBrandChange(brand._id)}
          />
          <span>{brand.name}</span>
        </label>
      ))}
    </div>
  );
}
