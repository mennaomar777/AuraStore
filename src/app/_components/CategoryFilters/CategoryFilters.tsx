"use client";

import type { Category } from "@/types/categories";

type CategoryFiltersProps = {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
};

export default function CategoryFilters({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div>
      {categories.map((category) => (
        <label
          key={category._id}
          className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm"
        >
          <input
            type="checkbox"
            className="size-4 shrink-0 cursor-pointer accent-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            checked={selectedCategories.includes(category._id)}
            onChange={() => onCategoryChange(category._id)}
          />
          <span>{category.name}</span>
        </label>
      ))}
    </div>
  );
}
