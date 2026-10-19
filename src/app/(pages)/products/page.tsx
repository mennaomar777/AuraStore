import Shop from "@/app/_components/Shop/Shop";
import { getProductsPage } from "@/services/products";
import { parsePage } from "@/lib/pagination";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parsePage(params.page);

  const result = await getProductsPage(page, 20);

  if (result.totalPages > 0 && page > result.totalPages) {
    redirect(`/products?page=${result.totalPages}`);
  }

  return (
    <Shop
      products={result.products}
      pagination={{
        pathname: "/products",
        page: result.page,
        totalPages: result.totalPages,
      }}
      searchParams={params}
    />
  );
}
