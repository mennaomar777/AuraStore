import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProductsPage } from "@/services/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function AllProducts() {
  const { products } = await getProductsPage(1, 8);

  return (
    <div className="pb-15 bg-white dark:bg-gray-950 transition-colors">
      <div className="px-5">
        <div className=" pb-15">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 rounded-full shadow bg-linear-to-b from-primary-400 to-primary-700" />

              <h2 className="font-bold text-3xl leading-9 text-gray-900 dark:text-white">
                Featured{" "}
                <span className="text-primary-600 dark:text-primary-400">
                  Products
                </span>
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex min-h-10 items-center gap-2 rounded-full  border border-primary-100 bg-white px-4 py-2 text-sm font-semibold text-primary-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-primary-900 dark:bg-gray-900 dark:text-primary-300 dark:hover:border-primary-700 dark:hover:bg-primary-950/50 dark:focus-visible:ring-offset-gray-950"
            >
              <span>View all products</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <ProductCard products={products} showSummary={false} />
      </div>
    </div>
  );
}
