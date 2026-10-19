export async function getAllBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brands");
  const data = await res.json();
  // console.log("allBrands:", data.data);
  return data.data;
}

export async function getBrandDetails(brandId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch brand");
  const data = await res.json();
  return data.data;
}
