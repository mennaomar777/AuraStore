import type { Product } from "@/types/products";
import ProductCardItem from "../ProductCardItem/ProductCardItem";

export default function ProductCard({
  products,
  showSummary = true,
}: {
  products: Product[];
  showSummary?: boolean;
}) {
  return (
    <div>
      {showSummary && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Products shown
          </p>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {products.length} shown
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCardItem product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
