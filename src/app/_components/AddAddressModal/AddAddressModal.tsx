"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  addressSchema,
  type AddressFormValues,
} from "@/schemas/address.schema";
import { addUserAddress } from "@/services/addresses";

export default function AddAddressModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    mode: "onChange",
  });

  async function handleAddAddress(values: AddressFormValues) {
    try {
      setIsLoading(true);
      const res = await addUserAddress(values);

      if (res.status !== "success") {
        toast.error(res.message || "Could not add the address.");
        return;
      }

      toast.success(res.message || "Address added successfully.");
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add the address.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    if (isLoading) return;
    setOpen(false);
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="w-fit cursor-pointer gap-2 rounded-md bg-primary-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/15 hover:bg-primary-700"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          +
        </span>
        Add address
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/55 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-address-title"
            aria-describedby="add-address-description"
            className="my-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-gray-950/20 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="relative overflow-hidden bg-linear-to-r from-emerald-800 via-primary-700 to-emerald-600 px-6 py-6 text-white sm:px-8">
              <div className="absolute -right-8 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close add address dialog"
                onClick={closeModal}
                disabled={isLoading}
                className="absolute right-5 top-5 z-10 cursor-pointer text-white/80 hover:bg-white/15 hover:text-white disabled:cursor-not-allowed"
              >
                <X size={18} />
              </Button>
              <div className="relative flex items-center gap-4 pr-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <MapPin size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                    Delivery details
                  </p>
                  <h2 id="add-address-title" className="mt-1 text-xl font-bold">
                    Add a new address
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p
                id="add-address-description"
                className="mb-6 text-sm leading-6 text-gray-500 dark:text-gray-400"
              >
                Save an address to make your next checkout quicker.
              </p>

              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(handleAddAddress)}
              >
                <FieldGroup className="gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                          >
                            Address name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g. Home, Work"
                            autoComplete="address-line1"
                            disabled={isLoading}
                            aria-invalid={fieldState.invalid}
                            className="h-11 rounded-xl bg-gray-50 px-3.5 dark:bg-gray-800 border-gray-200"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="phone"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                          >
                            Phone number
                          </FieldLabel>
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="e.g. 01012345678"
                            disabled={isLoading}
                            aria-invalid={fieldState.invalid}
                            className="h-11 rounded-xl bg-gray-50 px-3.5 dark:bg-gray-800 border-gray-200"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="city"
                          className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          City
                        </FieldLabel>
                        <Input
                          {...field}
                          id="city"
                          autoComplete="address-level2"
                          placeholder="Enter your city"
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          className="h-11 rounded-xl bg-gray-50 px-3.5 dark:bg-gray-800 border-gray-200"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="details"
                          className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          Address details
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="details"
                          autoComplete="street-address"
                          placeholder="Building, street, floor, apartment..."
                          rows={3}
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          className="min-h-24 resize-y rounded-xl bg-gray-50 px-3.5 py-3 dark:bg-gray-800 border-gray-200"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="flex items-center flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isLoading}
                    className="cursor-pointer rounded-md border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isValid}
                    className="cursor-pointer rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Saving address..." : "Save address"}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
