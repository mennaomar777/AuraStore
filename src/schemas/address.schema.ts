import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().trim().nonempty("Enter an address name"),
  details: z.string().trim().nonempty("Enter the address details"),
  phone: z
    .string()
    .trim()
    .nonempty("Enter a phone number")
    .regex(
      /^(?:\+20|0)(10|11|12|15)\d{8}$/,
      "Only Egyptian phone numbers are allowed",
    ),
  city: z.string().trim().nonempty("Enter a city"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
