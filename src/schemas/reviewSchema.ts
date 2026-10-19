import * as z from "zod";

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Choose a rating").max(5),
  review: z
    .string()
    .trim()
    .nonempty("Write your review")
    .max(1000, "Your review must be 1000 characters or fewer"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
