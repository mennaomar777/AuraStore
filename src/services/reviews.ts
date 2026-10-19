"use server";
import getMyToken from "./getToken";
import type { Review } from "@/types/products";
import { revalidatePath } from "next/cache";

export async function createReview(
  productId: string,
  review: { review: string; rating: number },
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please sign in to submit a review.");
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message ?? "Failed to submit review.");
  }
  revalidatePath(`/products/${productId}`);

  return data;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId + "/reviews",
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to fetch product reviews.");
  }

  const reviews = Array.isArray(data) ? data : data.data;
  return Array.isArray(reviews) ? (reviews as Review[]) : [];
}

export async function updateReviewByOwner(
  reviewId: string,
  productId: string,
  review: { review: string; rating: number },
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please sign in.");
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Could not update review.");
  revalidatePath(`/products/${productId}`);
  return data;
}

export async function deleteReviewByOwnerOrAdmin(
  reviewId: string,
  productId: string,
) {
  const token = await getMyToken();

  if (!token) throw new Error("Please sign in.");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    },
  );
  console.log(res);

  if (!res.ok) {
    const errMessage = await res.text();
    throw new Error(errMessage || "Could not delete review.");
  }
  revalidatePath(`/products/${productId}`);
  return true;
}
