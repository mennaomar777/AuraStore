import ProductDetails from "@/app/_components/ProductDetails/ProductDetails";
import { getAllProducts, getProductDetails } from "@/services/products";
import ProductsTabs from "@/app/_components/ProductsTabs/ProductsTabs";
import { Product } from "@/types/products";
import ProductCardItem from "@/app/_components/ProductCardItem/ProductCardItem";
type Props = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await getProductDetails(id);
  const relatedProducts = await getAllProducts(
    `?category[in]=${product.category._id}`,
  );

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16">
      <ProductDetails product={product} />
      <ProductsTabs product={product} />

      <section className="mt-16 border-t border-gray-100 pt-10 dark:border-gray-800 sm:mt-20 sm:pt-12">
        <div className="mb-7 flex flex-col gap-2 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            You may also like
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Related products
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                More from {product.category.name}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              {relatedProducts.length} items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProducts.map((product: Product) => (
            <ProductCardItem key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
