import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().trim().nonempty("*Please enter your address details"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+20|0)(10|11|12|15)\d{8}$/,
      "*Only Egyptian phone numbers are allowed",
    ),
  city: z.string().trim().nonempty("*Please enter your city"),
});

export type CheckoutFormType = z.infer<typeof checkoutSchema>;
