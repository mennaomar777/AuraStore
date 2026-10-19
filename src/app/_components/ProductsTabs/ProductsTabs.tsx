import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Star,
  Truck,
  Check,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Product } from "@/types/products";
import Rating from "../Rating/Rating";
import ReviewsList from "./ReviewsList";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { getProductReviews } from "@/services/reviews";

const productTabTriggerClass =
  "h-auto min-h-12 flex-none whitespace-nowrap rounded-none border-x-0 border-t-0 border-b-2 border-b-transparent px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 data-[state=active]:border-b-primary-700 data-[state=active]:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-primary-300 dark:data-[state=active]:border-b-primary-400 dark:group-data-[variant=line]/tabs-list:data-active:border-b-primary-400 dark:data-[state=active]:text-primary-300 sm:flex-1 sm:px-4 sm:text-base";

export default async function ProductsTabs({ product }: { product: Product }) {
  const productReviews = await getProductReviews(product.id);

  const totalReviews = productReviews.length;
  const averageRating =
    totalReviews === 0
      ? 0
      : productReviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews;

  return (
    <Tabs
      defaultValue="details"
      className="my-10 rounded-2xl border border-gray-200/80 bg-white pb-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <TabsList
        variant="line"
        className="no-scrollbar mb-5 mt-0 flex w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto overflow-y-clip overscroll-x-contain border-b border-gray-200 bg-transparent px-2 py-6 dark:border-gray-700"
      >
        {/* Details Tab */}
        <TabsTrigger
          value="details"
          className={`${productTabTriggerClass} cursor-pointer`}
        >
          <Package size={17} />
          Product Details
        </TabsTrigger>

        {/* Reviews Tab */}
        <TabsTrigger
          value="reviews"
          className={`${productTabTriggerClass} cursor-pointer`}
        >
          <Star size={17} />
          Reviews ({totalReviews})
        </TabsTrigger>

        {/* Shipping Tab */}
        <TabsTrigger
          value="shipping"
          className={`${productTabTriggerClass} cursor-pointer`}
        >
          <Truck size={17} />
          Shipping & Returns
        </TabsTrigger>
      </TabsList>

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        {/* Product Details Tab */}
        <TabsContent value="details">
          <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 leading-7">
            About this Product
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Information */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/50 sm:p-5">
              <h3 className="font-medium text-[17px] text-dark-900 dark:text-white mb-4">
                Product Information
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Category", value: product.category.name },
                  { label: "Brand", value: product.brand.name },
                  { label: "Items Sold", value: `${product.sold}+ sold` },
                  { label: "Rating", value: `${product.sold}+ Sold` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {label}
                    </span>

                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/50 sm:p-5">
              <h3 className="font-medium text-[17px] text-dark-900 dark:text-white mb-4">
                Key Features
              </h3>

              <div className="space-y-3">
                {[
                  "Premium Quality Product",
                  "100% Authentic Guarantee",
                  "Fast & Secure Packaging",
                  "Quality Tested",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100/70 dark:bg-emerald-900/70">
                      <Check
                        size={12}
                        className="text-primary-700 dark:text-emerald-200"
                      />
                    </div>

                    <span className="text-sm font-medium leading-5 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div>
            {/* Reviews Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 pb-8 border-b border-gray-200/70 dark:border-gray-800">
              {/* Left Side */}
              <div className="col-span-1 flex flex-col justify-center items-center">
                <span className="font-bold text-5xl py-3 text-gray-900 dark:text-white">
                  {averageRating.toFixed(1)}
                </span>

                <Rating value={averageRating} />

                <p className="py-3 text-gray-400 dark:text-gray-300 font-medium">
                  Based on {totalReviews} reviews
                </p>
              </div>

              {/* Right Side */}
              <div className="col-span-3 flex flex-col gap-5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = productReviews.filter(
                    (review) => review.rating === stars,
                  ).length;

                  const percentage =
                    totalReviews === 0
                      ? 0
                      : Math.round((count / totalReviews) * 100);

                  return (
                    <div key={stars} className="flex items-center gap-4">
                      <span className="w-14 text-gray-700 dark:text-gray-300 font-medium">
                        {stars} star
                      </span>

                      <div className="flex-1">
                        <ProgressBar value={percentage} />
                      </div>

                      <span className="w-12 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ReviewsList reviews={productReviews} productId={product.id} />
          </div>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Shipping Information */}
            <div className="rounded-xl border border-primary-100/70 bg-primary-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 sm:p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 shadow-sm shadow-primary-900/20 dark:bg-emerald-700">
                  <Truck size={22} className="text-white" strokeWidth={2.25} />
                </div>

                <h3 className="font-semibold text-[17px] text-gray-900 dark:text-white">
                  Shipping Information
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  "Free shipping on orders over $50",
                  "Standard delivery: 3-5 business days",
                  "Express delivery available (1-2 business days)",
                  "Track your order in real-time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check
                      size={16}
                      className="shrink-0 text-primary-700 dark:text-emerald-300"
                    />

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Returns & Refunds */}
            <div className="rounded-xl border border-primary-100/70 bg-primary-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 sm:p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 shadow-sm shadow-primary-900/20 dark:bg-emerald-700">
                  <RotateCcw
                    size={22}
                    className="text-white"
                    strokeWidth={2.25}
                  />
                </div>

                <h3 className="font-semibold text-[17px] text-gray-900 dark:text-white">
                  Returns & Refunds
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  "30-day hassle-free returns",
                  "Full refund or exchange available",
                  "Free return shipping on defective items",
                  "Easy online return process",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check
                      size={16}
                      className="shrink-0 text-primary-700 dark:text-emerald-300"
                    />

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buyer Protection */}
          <div className="flex items-start gap-4 rounded-xl border border-gray-200/80 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-emerald-200">
              <ShieldCheck
                size={22}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-[16.5px]">
                Buyer Protection Guarantee
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Get a full refund if your order doesn&apos;t arrive or
                isn&apos;t as described. We ensure your shopping experience is
                safe and secure.
              </p>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
