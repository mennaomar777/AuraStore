export async function getAllCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  // console.log("data.data", data);

  return data.data;
}

export async function getCategoryDetails(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  // console.log("categoryDetails", data.data);

  return data.data;
}
