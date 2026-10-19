"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  MessageSquareText,
  PenLine,
  Star,
  MoreVertical,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";
import type { Review } from "@/types/products";
import Rating from "../Rating/Rating";
import {
  createReview,
  updateReviewByOwner,
  deleteReviewByOwnerOrAdmin,
} from "@/services/reviews";

import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { reviewSchema, type ReviewFormValues } from "@/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import ConfirmDeleteDialog from "@/app/_components/ConfirmDeleteDialog/ConfirmDeleteDialog";
export default function ReviewsList({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [openReviewMenuId, setOpenReviewMenuId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
    mode: "onChange",
  });

  async function handleReviewSubmit(values: ReviewFormValues) {
    try {
      if (editingReview) {
        await updateReviewByOwner(editingReview._id, productId, values);
        toast.success("Review updated successfully.");
        setEditingReview(null);
      } else {
        await createReview(productId, values);
        toast.success("Review submitted successfully.");
      }

      form.reset();
      setEditingReview(null);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : editingReview
            ? "Could not update your review."
            : "Could not submit your review.",
      );
    }
  }

  function prepareReview(review: Review) {
    setEditingReview(review);
    setOpenReviewMenuId(null);
    form.reset({
      rating: review.rating,
      review: review.review,
    });
  }
  async function deleteReview(reviewId: string): Promise<boolean> {
    try {
      await deleteReviewByOwnerOrAdmin(reviewId, productId);
      toast.success("Your review deleted successfully.");
      setOpenReviewMenuId(null);
      router.refresh();
      return true;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete your review.",
      );
      return false;
    }
  }

  return (
    <section className="mt-8 space-y-8" aria-label="Customer reviews">
      <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50/80 via-white to-white p-5 shadow-sm dark:border-primary-950/70 dark:from-primary-950/20 dark:via-gray-950 dark:to-gray-950 sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950/70 dark:text-primary-300">
            <PenLine size={18} />
          </span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {editingReview ? "Edit your review" : "Write a review"}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {editingReview
                ? "Update your rating or feedback for this product."
                : "Share your experience with this product."}
            </p>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(handleReviewSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel>Your rating</FieldLabel>
                  <fieldset>
                    <legend className="sr-only">
                      Choose a rating from one to five stars
                    </legend>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label
                          key={rating}
                          htmlFor={"review-rating-" + rating}
                          className="cursor-pointer rounded-md p-1 transition hover:scale-110 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500"
                          aria-label={
                            rating + " star" + (rating === 1 ? "" : "s")
                          }
                        >
                          <input
                            ref={rating === 1 ? field.ref : undefined}
                            id={"review-rating-" + rating}
                            className="peer sr-only"
                            type="radio"
                            name={field.name}
                            value={rating}
                            checked={field.value === rating}
                            onChange={() => field.onChange(rating)}
                            onBlur={field.onBlur}
                          />
                          <Star
                            size={25}
                            className={
                              "transition " +
                              (field.value >= rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-transparent text-gray-300 dark:text-gray-600")
                            }
                          />
                        </label>
                      ))}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {field.value
                          ? field.value + " out of 5"
                          : "Select a rating"}
                      </span>
                    </div>
                  </fieldset>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="review"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="review-text">Your review</FieldLabel>
                  <Textarea
                    {...field}
                    id="review-text"
                    rows={4}
                    aria-invalid={fieldState.invalid}
                    placeholder="What did you like or dislike? How was the quality?"
                    className="min-h-28 resize-y bg-white dark:bg-gray-900"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your feedback helps other shoppers make confident choices.
            </p>
            {editingReview ? (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={form.formState.isSubmitting}
                  onClick={() => {
                    setEditingReview(null);
                    form.reset({ rating: 0, review: "" });
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-h-11 cursor-pointer rounded-xl bg-amber-600 px-5 font-semibold text-white shadow-sm transition hover:bg-amber-700 hover:shadow-md focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {form.formState.isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </div>
            ) : (
              <>
                {" "}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-h-11 cursor-pointer rounded-xl bg-primary-600 px-5 font-semibold text-white shadow-sm hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Star size={16} />
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit review"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Customer reviews
              </h3>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {reviews.length}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {reviews.length === 0
                ? "No customer feedback yet"
                : showAll || reviews.length <= 3
                  ? "Showing all " + reviews.length + " reviews"
                  : "Showing 3 of " + reviews.length + " reviews"}
            </p>
          </div>

          {reviews.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 self-start rounded-full border border-primary-200 bg-white px-4 text-sm font-semibold text-primary-700 shadow-sm transition hover:border-primary-400 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-primary-900 dark:bg-gray-900 dark:text-primary-300 dark:hover:bg-primary-950/50 sm:self-auto"
            >
              {showAll ? "Show fewer" : "View all " + reviews.length}
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-3">
            {visibleReviews.map((review) => {
              const canManageReview =
                session?.user?.id === review.user?._id ||
                session?.user?.role === "admin";
              return (
                <article
                  key={review._id}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/40 dark:hover:border-primary-900 dark:hover:shadow-black/20 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold uppercase text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                        {(review.user?.name ?? "C").charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900 dark:text-white">
                          {review.user?.name ?? "Customer"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-300">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-50 px-3 py-1.5 dark:bg-amber-950/30">
                        <Rating value={review.rating} />
                      </div>
                      {canManageReview && (
                        <div className="relative">
                          <button
                            type="button"
                            aria-label="Review actions"
                            aria-expanded={openReviewMenuId === review._id}
                            aria-controls={"review-actions-" + review._id}
                            onClick={() =>
                              setOpenReviewMenuId((current) =>
                                current === review._id ? null : review._id,
                              )
                            }
                            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                          >
                            <MoreVertical size={19} />
                          </button>

                          {openReviewMenuId === review._id && (
                            <div
                              id={"review-actions-" + review._id}
                              role="menu"
                              className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                            >
                              <button
                                onClick={() => prepareReview(review)}
                                type="button"
                                role="menuitem"
                                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                              >
                                <Pencil size={15} />
                                Edit review
                              </button>
                              <ConfirmDeleteDialog
                                itemName="your review"
                                description="This permanently removes your review from this product. This action cannot be undone."
                                onConfirm={() => deleteReview(review._id)}
                                trigger={
                                  <button
                                    type="button"
                                    role="menuitem"
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                                  >
                                    <Trash2 size={15} />
                                    Delete review
                                  </button>
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                    {review.review}
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center dark:border-gray-700 dark:bg-gray-950/30">
            <MessageSquareText className="mx-auto text-gray-400" size={22} />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Be the first to share your thoughts about this product.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

