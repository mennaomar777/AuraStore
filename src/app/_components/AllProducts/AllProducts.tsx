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
              className="inline-flex w-fit items-center gap-1 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <ProductCard products={products} showSummary={false} />
      </div>
    </div>
  );
}
