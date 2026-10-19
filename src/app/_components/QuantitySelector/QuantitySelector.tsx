"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
  max,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  max: number;
}) {
  const isUnavailable = max <= 0;

  function decrease() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increase() {
    setQuantity((current) => Math.min(max, current + 1));
  }

  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900" aria-label="Select quantity">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        onClick={decrease}
        disabled={quantity <= 1 || isUnavailable}
        className="h-9 w-9 cursor-pointer rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-700 disabled:opacity-40 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Minus size={16} />
      </Button>
      <output className="min-w-10 text-center text-base font-semibold text-gray-900 dark:text-white" aria-live="polite">
        {quantity}
      </output>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Increase quantity"
        onClick={increase}
        disabled={quantity >= max || isUnavailable}
        className="h-9 w-9 cursor-pointer rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-700 disabled:opacity-40 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
