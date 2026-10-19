"use client";

import { checkoutSchema, type CheckoutFormType } from "@/schemas/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Banknote,
  Check,
  CreditCard,
  Lock,
  MapPin,
  MapPinned,
  Phone,
  Plus,
  RefreshCw,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cashPayment, onlinePayment } from "@/services/checkout";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "@/redux/slices/cartSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import type { SavedAddressType } from "@/types/addressType";
import { getUserAddresses } from "@/services/addresses";

export default function Checkout() {
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const { cartId }: { cartId: string } = useParams();
  const [savedAddresses, setSavedAddresses] = useState<SavedAddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  async function checkout(values: CheckoutFormType) {
    try {
      setIsLoading(true);
      if (paymentMethod === "cash") {
        const res = await cashPayment(cartId, values);
        if (res.status === "success") {
          router.push("/allorders");
          dispatch(clearCartItems());
        }
      } else if (paymentMethod === "online") {
        const res = await onlinePayment(cartId, values);
        // console.log(res);

        if (res.status === "success") {
          router.push(`${res.session?.url}`);
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Checkout failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    getUserAddresses()
      .then((res) => {
        if (isMounted) {
          setSavedAddresses(Array.isArray(res?.data) ? res.data : []);
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Could not load saved addresses.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingAddresses(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function selectAddress(address: SavedAddressType) {
    setSelectedAddressId(address._id);

    form.reset({
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
  }

  function startWithNewAddress() {
    setSelectedAddressId(null);

    form.reset({
      details: "",
      phone: "",
      city: "",
    });
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50/20 via-gray-50 to-white px-3 py-6 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 min-[375px]:px-4 sm:py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <nav
          className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:mb-6 sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link href={"/"}>Home</Link>
          <span>/</span>
          <Link href={"/cart"}>Cart</Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            Checkout
          </span>
        </nav>

        <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 dark:bg-emerald-900/70 dark:text-emerald-200 sm:h-12 sm:w-12">
            <PackageCheck size={23} strokeWidth={2.4} />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Complete your order
            </h1>
            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm">
              Review your delivery details and payment method.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)] lg:gap-8">
          <form
            id="sign-in-form"
            onSubmit={form.handleSubmit(checkout)}
            className="min-w-0 space-y-5 sm:space-y-6"
          >
            <Card className="overflow-hidden rounded-2xl border-0 bg-white py-0 shadow-lg shadow-gray-200/60 ring-0 transition-shadow dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
              <CardHeader className="bg-linear-to-r from-primary-700 to-primary-600 px-5 py-4 text-white sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                  <MapPin size={18} /> Shipping address
                </CardTitle>
                <CardDescription className="text-sm text-white/80">
                  Where should we deliver your order?
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <section
                  aria-labelledby="saved-addresses-title"
                  aria-busy={isLoadingAddresses}
                  className="mb-6 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-950/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 id="saved-addresses-title" className="text-sm font-semibold text-gray-900 dark:text-white">
                        Saved addresses
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Choose an address for this order, or enter another one.
                      </p>
                    </div>
                    {!isLoadingAddresses && savedAddresses.length > 0 && (
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700">
                        {savedAddresses.length} saved
                      </span>
                    )}
                  </div>

                  {isLoadingAddresses ? (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-5 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                      <RefreshCw aria-hidden="true" className="size-4 animate-spin text-primary-600 dark:text-primary-400" />
                      <span>Loading your saved addresses…</span>
                    </div>
                  ) : savedAddresses.length > 0 ? (
                    <div role="group" aria-label="Choose a saved delivery address" className="mt-4 grid gap-3 sm:grid-cols-2">
                      {savedAddresses.map((address) => {
                        const selected = selectedAddressId === address._id;

                        return (
                          <button
                            key={address._id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => selectAddress(address)}
                            className={`group flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${
                              selected
                                ? "border-primary-500 bg-primary-50/80 shadow-sm ring-2 ring-primary-500/15 dark:bg-primary-950/30"
                                : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-700"
                            }`}
                          >
                            <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-700 dark:bg-gray-800 dark:text-gray-300 dark:group-hover:bg-primary-950/60 dark:group-hover:text-primary-300"}`}>
                              <MapPin aria-hidden="true" className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                                {address.name || "Saved address"}
                              </span>
                              <span className="mt-1 block line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-300">
                                {address.details}
                              </span>
                              <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                                <span className="inline-flex items-center gap-1.5"><Phone aria-hidden="true" className="size-3 shrink-0 text-gray-500 dark:text-primary-300" />{address.phone}</span>
                                <span className="inline-flex items-center gap-1.5"><MapPinned aria-hidden="true" className="size-3 shrink-0 text-gray-500 dark:text-primary-300" />{address.city}</span>
                              </span>
                            </span>
                            <span aria-hidden="true" className={`flex size-5 shrink-0 items-center justify-center rounded-full ${selected ? "bg-primary-600 text-white" : "border border-gray-300 text-transparent dark:border-gray-600"}`}>
                              {selected && <Check className="size-3" strokeWidth={3} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-5 text-center dark:border-gray-700 dark:bg-gray-900">
                      <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
                        <MapPin aria-hidden="true" className="size-4" />
                      </span>
                      <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">No saved addresses yet</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Enter your delivery address below to continue.</p>
                    </div>
                  )}

                  <button
                    type="button"
                    aria-pressed={selectedAddressId === null}
                    onClick={startWithNewAddress}
                    className={`mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-dashed p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${
                      selectedAddressId === null
                        ? "border-primary-500 bg-primary-50/70 dark:bg-primary-950/30"
                        : "border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50/40 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-800 dark:hover:bg-primary-950/20"
                    }`}
                  >
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${selectedAddressId === null ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">Use a different address</span>
                      <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">Enter a delivery address for this order.</span>
                    </span>
                    <span aria-hidden="true" className={`flex size-5 shrink-0 items-center justify-center rounded-full ${selectedAddressId === null ? "bg-primary-600 text-white" : "border border-gray-300 dark:border-gray-600"}`}>
                      {selectedAddressId === null && <Check className="size-3" strokeWidth={3} />}
                    </span>
                  </button>
                </section>
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-primary-100/30 bg-white p-4 shadow shadow-primary-900/5 dark:border-primary-900/50 dark:bg-gray-900">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                    <MapPin size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Delivery information
                      </p>
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-800 ring-1 ring-primary-200/70 dark:bg-emerald-900/70 dark:text-emerald-100 dark:ring-emerald-700/70">
                        Required
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                      {selectedAddressId
                        ? "Your saved address is filled in below. Review or update it for this order."
                        : "Add your full address and a reachable phone number so your order arrives smoothly."}
                    </p>
                  </div>
                </div>
                <FieldGroup className="gap-4">
                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="details"
                          className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          Street Address{" "}
                          <span className="text-rose-500">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="details"
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          autoComplete="street-address"
                          className="h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                          disabled={isLoading}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
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
                          Phone Number <span className="text-rose-500">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="phone"
                          type="tel"
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          autoComplete="tel"
                          className="h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                          disabled={isLoading}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="city"
                          className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          City <span className="text-rose-500">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="city"
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          autoComplete="address-level2"
                          className="h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                          disabled={isLoading}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border-0 bg-white py-0 shadow-lg shadow-gray-200/60 ring-0 transition-shadow dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
              <CardHeader className="bg-linear-to-r from-primary-700 to-primary-600 px-5 py-4 text-white sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                  <CreditCard size={18} /> Payment method
                </CardTitle>
                <CardDescription className="text-sm text-white/80">
                  Choose how you would like to pay.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-5 sm:p-6">
                <fieldset className="space-y-3">
                  <legend className="sr-only">Choose a payment method</legend>

                  <label className="block cursor-pointer">
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />

                    <div
                      className={`flex items-center gap-3 rounded-xl p-4 transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 ${
                        paymentMethod === "cash"
                          ? "border-2 border-primary-600 bg-primary-50/70 shadow-sm shadow-primary-600/10 dark:bg-primary-950/30"
                          : "border border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-950"
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-emerald-900/70 dark:text-emerald-200">
                        <Banknote size={20} strokeWidth={2.25} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                          Cash on delivery
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                          Pay when your order arrives
                        </span>
                      </span>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          paymentMethod === "cash"
                            ? "bg-primary-600 text-white"
                            : "border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {paymentMethod === "cash" && (
                          <Check size={13} strokeWidth={3} />
                        )}
                      </span>
                    </div>
                  </label>

                  <label className="block cursor-pointer">
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                    />

                    <div
                      className={`flex items-center gap-3 rounded-xl p-4 transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 ${
                        paymentMethod === "online"
                          ? "border-2 border-primary-600 bg-primary-50/70 shadow-sm shadow-primary-600/10 dark:bg-primary-950/30"
                          : "border border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-950"
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <CreditCard size={20} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                          Pay online
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                          Secure payment with card or wallet
                        </span>
                      </span>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          paymentMethod === "online"
                            ? "bg-primary-600 text-white"
                            : "border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {paymentMethod === "online" && (
                          <Check size={13} strokeWidth={3} />
                        )}
                      </span>
                    </div>
                  </label>
                </fieldset>
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50/80 px-4 py-3 dark:bg-emerald-950/30">
                  <ShieldCheck
                    size={18}
                    className="shrink-0 text-primary-600 dark:text-primary-400"
                  />
                  <p className="text-xs leading-5 text-primary-800 dark:text-primary-300">
                    Your information is protected with secure checkout.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button
              className="h-12 w-full cursor-pointer rounded-xl bg-primary-600 text-base font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-70"
              type="submit"
              form="sign-in-form"
              disabled={isLoading}
            >
              <Lock size={17} className="mr-2" />
              {isLoading ? "Checkout..." : "Place order"}
            </Button>
          </form>

          <aside className="min-w-0 lg:sticky lg:top-18.5">
            <Card className="overflow-hidden rounded-2xl border-0 bg-white py-0 shadow-lg shadow-gray-200/60 ring-0 transition-shadow dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
              <CardHeader className="bg-linear-to-r from-primary-700 to-primary-600 px-5 py-4 text-white">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                  <PackageCheck size={18} /> Order summary
                </CardTitle>
                <CardDescription className="text-sm text-white/80">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 p-5">
                {cartItems.length > 0 ? (
                  <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-950/70"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                          {item.product?.imageCover && (
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title ?? "Product"}
                              fill
                              sizes="56px"
                              className="object-contain p-1"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {item.product?.title ?? "Product"}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {item.count} &times;{" "}
                            {item.price.toLocaleString("en-EG")} EGP
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-bold text-gray-900 dark:text-white">
                          {(item.price * item.count).toLocaleString("en-EG")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 px-4 py-7 text-center dark:border-gray-700">
                    <PackageCheck
                      size={24}
                      className="mx-auto text-primary-600 dark:text-primary-400"
                    />
                    <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Your cart is empty
                    </p>
                  </div>
                )}

                <div className="space-y-3 border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
                  <div className="flex items-center justify-between gap-3 text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString("en-EG")} EGP</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-gray-500 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <span className="font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                      {subtotal.toLocaleString("en-EG")}{" "}
                      <span className="text-xs font-medium">EGP</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-400 dark:border-gray-800">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-primary-600 dark:text-primary-400" />{" "}
                    Secure
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <PackageCheck size={14} className="text-primary-600 dark:text-primary-400" />{" "}
                    Carefully packed
                  </span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
