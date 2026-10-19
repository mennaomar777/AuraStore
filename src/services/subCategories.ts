export async function getSubCategories() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories",
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch subCategories");
  const data = await res.json();
  // console.log("dataaaaaa", data.data);

  return data.data;
}

export async function getSpecificSubCategory(subCategoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  // console.log("getSpecificSubCategory", data.data);

  return data.data;
}

export async function getSubCategoriesByCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error("Failed to fetch category subcategories");

  const data = await res.json();
  // console.log("getSubCategoriesByCategory", data.data);

  return data.data;
}
