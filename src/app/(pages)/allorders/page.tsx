import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getUserOrders } from "@/services/checkout";
import type { Order } from "@/types/orders";

const money = (amount: number) => `${amount.toLocaleString("en-EG")} EGP`;

export default async function AllOrders() {
  const orders = (await getUserOrders()) as Order[];

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50/50 via-gray-50 to-white px-3 py-6 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 min-[375px]:px-4 sm:px-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <nav
          className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:mb-7 sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition hover:text-primary-700 dark:hover:text-primary-300"
          >
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            My orders
          </span>
        </nav>

        <section className="mb-6 overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-primary-700 to-emerald-600 px-4 py-6 text-white shadow-xl shadow-emerald-900/10 sm:mb-8 sm:px-9 sm:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 sm:h-12 sm:w-12">
                <PackageCheck size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  Your AuraStore account
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-4xl">
                  My orders
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-5 text-white/85 sm:text-base sm:leading-6">
                  Track your purchases and review payment and delivery details.
                </p>
              </div>
            </div>
            <div className="w-fit rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-xs font-medium text-white/75">
                {orders.length === 1 ? "order placed" : "orders placed"}
              </p>
            </div>
          </div>
        </section>

        {orders.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <ShoppingBag size={28} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              No orders yet
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              When you place an order, you’ll find its payment and delivery
              details here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Start shopping <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <section className="space-y-5" aria-label="Order history">
            {orders.map((order) => {
              const paymentLabel =
                order.paymentMethodType.toLowerCase() === "cash"
                  ? "Cash on delivery"
                  : order.paymentMethodType.toLowerCase() === "card"
                    ? "Online card"
                    : order.paymentMethodType;
              const orderNumber = order.id ?? order._id;
              const placedDate = new Intl.DateTimeFormat("en-EG", {
                dateStyle: "medium",
              }).format(new Date(order.createdAt));

              return (
                <details
                  key={order._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow open:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-3 border-b border-gray-100 bg-gray-50/80 px-4 py-4 transition-colors hover:bg-gray-100/80 dark:border-gray-800 dark:bg-gray-950/50 dark:hover:bg-gray-800/70 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Order number
                        </p>
                        <p className="mt-0.5 break-all font-bold text-gray-900 dark:text-white sm:break-normal">
                          #{orderNumber}
                        </p>
                      </div>
                      <span className="hidden h-8 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
                      <p className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CalendarDays size={16} className="text-gray-400" />
                        {placedDate}
                      </p>
                    </div>
                    <div className="col-span-2 flex flex-wrap gap-2 sm:col-auto">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        <CreditCard size={14} /> {paymentLabel}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          order.isPaid
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {order.isPaid ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Clock3 size={14} />
                        )}
                        {order.isPaid ? "Paid" : "Payment pending"}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className="col-start-2 row-start-1 mt-1 shrink-0 justify-self-end text-gray-500 transition-transform group-open:rotate-180 dark:text-gray-400 sm:col-auto sm:row-auto sm:mt-0 sm:self-center sm:justify-self-auto"
                    />
                  </summary>

                  <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[minmax(0,1fr)_230px]">
                    <div className="space-y-5">
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                          <Package size={17} className="text-primary-600" />
                          Items in this order
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {order.cartItems.length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {order.cartItems.map((item, index) => {
                            const product = typeof item.product === "object" ? item.product : undefined;
                            const title = product?.title ?? "Product";
                            const imageCover = product?.imageCover;

                            return (
                              <div
                                key={item._id ?? `${order._id}-${index}`}
                                className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-gray-50 px-2.5 py-3 dark:bg-gray-950/70 min-[375px]:px-3 sm:gap-4 sm:px-4"
                              >
                                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-gray-800 sm:h-16 sm:w-16">
                                    {imageCover ? (
                                      <Image src={imageCover} alt={title} fill sizes="(max-width: 639px) 48px, 64px" className="object-contain p-1" />
                                    ) : (
                                      <div className="flex h-full items-center justify-center text-gray-400"><Package size={20} /></div>
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                  <p className="line-clamp-2 break-words text-xs font-medium leading-4 text-gray-800 dark:text-gray-200 sm:text-sm sm:leading-normal">
                                    {title}
                                  </p>
                                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                    Quantity: {item.count}
                                  </p>
                                </div>
                                </div>
                                <p className="whitespace-nowrap text-right text-xs font-semibold text-gray-900 dark:text-white sm:text-sm">
                                  {money(item.price * item.count)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {order.shippingAddress && (
                        <div className="flex items-start gap-3 rounded-xl border border-gray-100 px-4 py-3 dark:border-gray-800">
                          <MapPin
                            size={17}
                            className="mt-0.5 shrink-0 text-primary-600"
                          />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              Delivery address
                            </p>
                            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                              {[
                                order.shippingAddress.details,
                                order.shippingAddress.city,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <aside className="flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                        <Truck size={17} className="text-primary-600 dark:text-primary-400" />
                        Delivery status
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {order.isDelivered ? (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-600"
                          />
                        ) : (
                          <Clock3 size={18} className="text-amber-600" />
                        )}
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {order.isDelivered ? "Delivered" : "Being prepared"}
                        </p>
                      </div>

                      <div className="my-4 border-t border-primary-100 dark:border-primary-900/50" />
                      <div className="space-y-2 text-sm">
                        {typeof order.shippingPrice === "number" && (
                          <div className="flex justify-between gap-2 text-gray-500 dark:text-gray-400">
                            <span>Shipping</span>
                            <span>{money(order.shippingPrice)}</span>
                          </div>
                        )}
                        {typeof order.taxPrice === "number" && (
                          <div className="flex justify-between gap-2 text-gray-500 dark:text-gray-400">
                            <span>Tax</span>
                            <span>{money(order.taxPrice)}</span>
                          </div>
                        )}
                        <div className="flex items-end justify-between gap-2 pt-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            Total
                          </span>
                          <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                            {money(order.totalOrderPrice)}
                          </span>
                        </div>
                      </div>
                    </aside>
                  </div>
                </details>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
