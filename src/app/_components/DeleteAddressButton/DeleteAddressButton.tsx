"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { removeUserAddress } from "@/services/addresses";

export default function DeleteAddressButton({
  addressId,
  addressName = "this address",
}: {
  addressId: string;
  addressName?: string;
}) {
  const router = useRouter();

  async function handleRemove(): Promise<boolean> {
    try {
      const res = await removeUserAddress(addressId);
      if (res.status !== "success") {
        toast.error(res.message || "Could not delete the address.");
        return false;
      }

      toast.success(res.message || "Address deleted successfully.");
      router.refresh();
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the address.",
      );
      return false;
    }
  }

  return (
    <ConfirmDeleteDialog
      itemName={addressName}
      description="This removes the address from your saved destinations. It will not affect orders you have already placed."
      onConfirm={handleRemove}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Delete ${addressName}`}
          title="Delete address"
          className="size-9 cursor-pointer rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
        >
          <Trash2 size={17} />
        </Button>
      }
    />
  );
}
