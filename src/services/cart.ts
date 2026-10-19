"use server";

import getMyToken from "./getToken";

const BASE_URL = "https://ecommerce.routemisr.com/api/v2/cart";

export async function addToCart(productId: string) {
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
    body: JSON.stringify({
      productId,
    }),
  });

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to add item to cart");
  }

  return finalRes;
}

export async function getCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to get cart");
  }
  // console.log("cart", finalRes);

  return finalRes;
}

export async function deleteCartItem(productId: string) {
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
    throw new Error(finalRes.message || "Failed to delete product from cart");
  }
  return finalRes;
}

export async function updateQuantity(productId: string, count: number) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }
  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });
  const finalRes = await res.json();

  if (!res.ok)
    throw new Error(finalRes.message || "Failed to update product quantity");
  return finalRes;
}

export async function deleteCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      token,
    },

    cache: "no-store",
  });

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to delete the from cart");
  }
  return finalRes;
}

export async function applyCouponToCart(couponName: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(`${BASE_URL}/applyCoupon`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ couponName }),

    cache: "no-store",
  });

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Failed to apply coupon");
  }
  console.log(finalRes);

  return finalRes;
}
