import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().trim().nonempty("*Please enter your address details"),
  phone: z
    .string()
    .trim()
    .nonempty("*Please enter your phone")
    .regex(/^01[0125]\d{8}$/, "*Enter a valid Egyptian mobile number"),
  city: z.string().trim().nonempty("*Please enter your city"),
});

export type CheckoutFormType = z.infer<typeof checkoutSchema>;
