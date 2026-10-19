"use client";
import Image from "next/image";
import {
  User,
  Minus,
  Plus,
  Trash2,
  Loader2Icon,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Lock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  applyCouponToCart,
  deleteCart,
  deleteCartItem,
  updateQuantity,
} from "@/services/cart";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearCartItems } from "@/redux/slices/cartSlice";
import { useCart } from "@/hooks/useCart";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import type { CartCardsProps } from "@/types/cart";

export default function CartCards({ cartItems, cartId }: CartCardsProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const { syncCartToRedux } = useCart();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const [countLoading, setCountLoading] = useState<{
    id: string;
    action: "increase" | "decrease";
  } | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.count * item.price,
    0,
  );

  async function clearCart(): Promise<boolean> {
    try {
      const res = await deleteCart();
      if (res.status !== "success") {
        toast.error(res.message || "Could not clear the cart.");
        return false;
      }

      toast.success(res.message || "Cart cleared successfully.");
      router.refresh();
      dispatch(clearCartItems());
      return true;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Could not clear the cart.",
      );
      return false;
    }
  }

  async function remItem(productId: string): Promise<boolean> {
    try {
      setLoadingId(productId);
      const res = await deleteCartItem(productId);
      if (res.status !== "success") {
        toast.error(res.message || "Could not remove this item.");
        return false;
      }

      toast.success(res.message || "Removed from cart.");
      router.refresh();
      await syncCartToRedux();
      return true;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Could not remove this item.",
      );
      return false;
    } finally {
      setLoadingId(null);
    }
  }

  async function updateProductQuantity(
    productId: string,
    count: number,
    action: "increase" | "decrease",
  ) {
    try {
      setCountLoading({
        id: productId,
        action,
      });
      const res = await updateQuantity(productId, count);

      if (res.status === "success") {
        toast.success(res.message);
        router.refresh();
        await syncCartToRedux();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setCountLoading(null);
    }
  }
  async function applyCoupon() {
    const couponName = promoCode.trim();

    if (!couponName) {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      setCouponLoading(true);
      const res = await applyCouponToCart(couponName);
      console.log(res);

      setPromoCode(couponName);
      toast.success(res.message || "Coupon applied successfully");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setCouponLoading(false);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => {
          return (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-28 h-28 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-primary-500 px-1.5 rounded-full flex justify-center items-center">
                    <span className="text-white text-[10px] ">✓ In Stock</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {item.product.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-primary-700 bg-primary-100/20 dark:bg-primary-900/20 dark:text-primary-400 px-2.5 py-1 rounded-full">
                      {item.product.category.name}
                    </span>
                    <span className="text-xs text-gray-400 flex justify-center items-center gap-2">
                      <div className="w-0.5 h-0.5 rounded-full bg-gray-400"></div>{" "}
                      <span className="font-medium">
                        SKU: {item.product._id.slice(-6).toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <p className="text-primary-600 font-bold text-lg mt-2">
                    {item.price} EGP{" "}
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      per unit
                    </span>
                  </p>
                </div>

                <div className="flex w-full flex-row items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                    <p className="font-bold text-xl text-gray-900 dark:text-white">
                      {item.count * item.price}{" "}
                      <span className="text-sm font-medium text-gray-400">
                        EGP
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={
                          item.count === 1 ||
                          countLoading?.id === item.product._id
                        }
                        onClick={() =>
                          item.count > 1 &&
                          updateProductQuantity(
                            item.product._id,
                            item.count - 1,
                            "decrease",
                          )
                        }
                        className="w-8 h-8 cursor-pointer rounded-lg border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:bg-gray-700 dark:hover:text-primary-300 dark:disabled:bg-gray-900 dark:disabled:text-gray-500"
                      >
                        {countLoading?.id === item.product._id &&
                        countLoading.action === "decrease" ? (
                          <Loader2Icon className="animate-spin" size={14} />
                        ) : (
                          <Minus size={14} />
                        )}
                      </Button>
                      <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                        {item.count}
                      </span>
                      <Button
                        disabled={countLoading?.id === item.product._id}
                        onClick={() =>
                          updateProductQuantity(
                            item.product._id,
                            item.count + 1,
                            "increase",
                          )
                        }
                        className="w-8 h-8 cursor-pointer rounded-lg bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                      >
                        {countLoading?.id === item.product._id &&
                        countLoading.action === "increase" ? (
                          <Loader2Icon className="animate-spin" size={14} />
                        ) : (
                          <Plus size={14} />
                        )}
                      </Button>
                    </div>

                    <ConfirmDeleteDialog
                      itemName={item.product.title}
                      description="This removes the item from your cart. You can add it again later."
                      onConfirm={() => remItem(item.product._id)}
                      trigger={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={loadingId === item.product._id}
                          aria-label={`Remove ${item.product.title} from cart`}
                          className="h-8 w-8 cursor-pointer rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white dark:bg-red-900/20 dark:hover:bg-red-900/40 disabled:cursor-not-allowed"
                        >
                          {loadingId === item.product._id ? (
                            <Loader2Icon size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="border-gray-200/70 dark:border-gray-800" />
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 flex justify-center items-center gap-1 font-medium text-sm"
          >
            <ArrowLeft size={15} /> Continue Shopping
          </Link>
          <ConfirmDeleteDialog
            itemName="all cart items"
            description="This will empty your cart. You will need to add products again before checkout."
            onConfirm={clearCart}
            trigger={
              <Button
                type="button"
                variant="outline"
                className="group cursor-pointer border-red-200 bg-white font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-500 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300 dark:hover:border-red-800 dark:hover:bg-red-950/60 dark:hover:text-red-200"
              >
                <Trash2 className="transition-transform duration-200 group-hover:scale-110" />
                Clear all items
              </Button>
            }
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:sticky lg:top-6">
          <div className="bg-primary-600 px-6 py-5 dark:bg-primary-700">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
                {isLoggedIn ? (
                  <p className="text-white/80 text-xs">
                    {cartItems.length} items in your cart
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 rounded-lg bg-primary-100/30 p-4 dark:bg-emerald-950/60">
                <div className="rounded-full bg-primary-100/50 p-2.5 dark:bg-emerald-900/70">
                  <Truck
                    size={18}
                    className="text-primary-600 dark:text-emerald-300"
                  />
                </div>
                <div>
                  <p className="font-semibold text-primary-700 dark:text-emerald-200">
                    Free Shipping!
                  </p>
                  <p className="text-sm font-medium text-primary-600 dark:text-emerald-300">
                    You qualify for free delivery
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">
                Subtotal{" "}
                {!isLoggedIn ? <span>({cartItems.length} items)</span> : null}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalPrice} EGP
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Shipping</span>
              {isLoggedIn ? (
                <span className="text-primary-600 font-bold text-sm">FREE</span>
              ) : (
                <span className="text-primary-600 font-bold text-sm">
                  Calculated at checkout
                </span>
              )}
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {isLoggedIn ? (
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="font-bold text-2xl text-gray-900 dark:text-white">
                  {totalPrice}{" "}
                  <span className="text-sm font-medium text-gray-400">EGP</span>
                </span>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Estimated Total
                </span>
                <span className="font-bold text-lg text-primary-600 dark:text-white">
                  {totalPrice} <span className="">EGP</span>
                </span>
              </div>
            )}

            {isLoggedIn ? (
              <>
                {/* Promo Code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      disabled={couponLoading}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Apply Promo Code"
                      className="pl-8 rounded-xl border-dashed border-gray-300 dark:border-gray-700 text-sm focus-visible:ring-primary-500"
                    />
                  </div>
                  <Button
                    onClick={() => applyCoupon()}
                    disabled={couponLoading}
                    variant="outline"
                    className="rounded-xl border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600"
                  >
                    {couponLoading ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                {/* Checkout Button */}
                <Link href={`/checkout/${cartId}`}>
                  <Button className="w-full p-6 rounded-xl text-white font-bold text-base bg-primary-600 hover:bg-primary-700 cursor-pointer transition-colors">
                    <Lock size={18} className="mr-2" />
                    Secure Checkout
                  </Button>
                </Link>
                {/* Badges */}
                <div className="flex justify-center items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck size={14} className="text-gray-400" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Truck size={14} className="text-gray-400" />
                    Fast Delivery
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
                  <Link
                    href="/"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <ArrowLeft size={14} /> Continue Shopping
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Button className="w-full p-6 rounded-md text-white font-semibold text-base bg-primary-600 hover:bg-primary-700 cursor-pointer transition-colors">
                  <User size={18} className="mr-2" />
                  Login to Checkout
                </Button>

                <p className="text-center text-xs text-gray-400 dark:text-gray-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signUp"
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="space-y-2 pt-5 border-t border-gray-100 dark:border-gray-800">
                  {[
                    "Your cart items will be saved",
                    "Track your orders easily",
                    "Access exclusive member deals",
                  ].map((perk) => (
                    <p
                      key={perk}
                      className="text-xs text-gray-400 dark:text-gray-300"
                    >
                      ✓ {perk}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
