import type { Product } from "@/types/products";

type ProductsPage = {
  products: Product[];
  page: number;
  limit: number;
  totalPages: number;
};

export async function getProductsPage(
  page = 1,
  limit = 20,
  categoryId?: string,
  brandId?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (categoryId) {
    params.set("category[in]", categoryId);
  }

  if (brandId) {
    params.set("brand", brandId);
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`,
    { next: { revalidate: 300 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return {
    products: data.data as Product[],
    page: data.metadata.currentPage ?? page,
    limit: data.metadata.limit,
    totalPages: data.metadata.numberOfPages,
  } satisfies ProductsPage;
}

export async function getAllProducts(query: string = "") {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products${query}`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  // console.log(data);

  const allProducts = [...data.data];

  const totalPages = data.metadata.numberOfPages;
  const limit = data.metadata.limit;
  const queryParams = new URLSearchParams(
    query.startsWith("?") ? query.slice(1) : query,
  );

  for (let page = 2; page <= totalPages; page++) {
    queryParams.set("page", String(page));
    queryParams.set("limit", String(limit));

    const pageRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?${queryParams.toString()}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!pageRes.ok) {
      throw new Error("Failed to fetch products");
    }

    const pageData = await pageRes.json();

    allProducts.push(...pageData.data);
  }

  return allProducts;
}

export async function getProductDetails(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();

  return data.data;
}
