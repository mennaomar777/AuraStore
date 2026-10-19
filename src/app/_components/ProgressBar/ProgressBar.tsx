"use client";

import { Progress } from "@/components/ui/progress";

export function ProgressBar({ value }: { value: number }) {
  return (
    <Progress
      value={value}
      className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
    />
  );
}
