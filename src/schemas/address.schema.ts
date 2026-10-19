import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().trim().nonempty("Enter an address name"),
  details: z.string().trim().nonempty("Enter the address details"),
  phone: z.string().trim().nonempty("Enter a phone number"),
  city: z.string().trim().nonempty("Enter a city"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
