"use server";

import getMyToken from "./getToken";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });
  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to add item to wishlist");
  }

  return finalRes;
}

export async function getWishlist() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }
  const res = await fetch(BASE_URL, {
    headers: {
      token,
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to get wishlist");
  }

  return finalRes;
}

export async function deleteWishListItem(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },

    cache: "no-store",
  });

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(
      finalRes.message || "Failed to delete product from wishlist",
    );
  }
  return finalRes;
}
