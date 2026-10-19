"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  itemName: string;
  description: string;
  trigger: ReactElement;
  onConfirm: () => Promise<boolean>;
};

export default function ConfirmDeleteDialog({
  itemName,
  description,
  trigger,
  onConfirm,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function confirmDelete() {
    try {
      setIsLoading(true);
      const succeeded = await onConfirm();
      if (succeeded) setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete this item.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isLoading) setOpen(nextOpen);
      }}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent className="!max-w-lg gap-0 overflow-hidden rounded-3xl border-0 bg-white p-0 shadow-2xl shadow-gray-950/20 ring-0 dark:bg-gray-900">
        <AlertDialogHeader className="flex items-start gap-4 p-6 text-left sm:p-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <Trash2 size={21} aria-hidden="true" />
          </span>
          <div className="min-w-0 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600 dark:text-red-400">
              Confirm removal
            </p>
            <AlertDialogTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Delete {itemName}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mx-0 mb-0 flex-col-reverse gap-2 rounded-none border-t border-gray-100 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-950/50 sm:flex-row sm:justify-end sm:px-8">
          <AlertDialogCancel
            disabled={isLoading}
            className="h-11 w-full cursor-pointer rounded-xl border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
          >
            Keep it
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isLoading}
            onClick={(event) => {
              event.preventDefault();
              void confirmDelete();
            }}
            className="h-11 w-full cursor-pointer rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 hover:text-white disabled:cursor-not-allowed sm:w-auto"
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 size={16} aria-hidden="true" />
            )}
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
