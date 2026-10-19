import * as z from "zod";

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("*Please enter your name")
      .min(3, "*Name is too short")
      .max(30, "*Name is too long"),

    email: z
      .email("*Please enter your email")
      .trim()
      .min(1, "*Invalid email address"),

    password: z
      .string()
      .trim()
      .nonempty("*Please enter your password")
      .min(8, "*Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "*Password must contain uppercase, lowercase, number and special character",
      ),

    rePassword: z.string().trim().min(1, "*Please confirm your password"),

    phone: z
      .string()
      .trim()
      .min(1, "*Please enter your phone number")
      .regex(
        /^(?:\+20|0)(10|11|12|15)\d{8}$/,
        "*Only Egyptian phone numbers are allowed",
      ),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "*You must accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const signInFormSchema = z.object({
  email: z.email("*Invalid email address").trim().min(1, "*Email is required"),
  password: z.string().trim().min(1, "*Password is required"),
});

export const forgetPasswordFormSchema = z.object({
  email: z.email("*Invalid email address").trim().min(1, "*Email is required"),
});
export const verifyResetCodeFormSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .min(1, "*Please enter the reset code")
    .regex(/^\d+$/, "*Enter numbers only"),
});
export const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().trim().nonempty("*Password is required"),
    confirmPassword: z
      .string()
      .trim()
      .nonempty("*Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "*Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export const updateUserDataSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("*Please enter your name")
    .min(3, "*Name is too short")
    .max(30, "*Name is too long"),
  email: z.email("*Invalid email address").trim().min(1, "*Email is required"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+20|0)(10|11|12|15)\d{8}$/,
      "*Only Egyptian phone numbers are allowed",
    ),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "*Enter your current password"),
    password: z
      .string()
      .min(8, "*Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "*Password must contain uppercase, lowercase, number and special character",
      ),
    rePassword: z.string().min(1, "*Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "*Passwords do not match",
    path: ["rePassword"],
  });

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
export type SignInFormType = z.infer<typeof signInFormSchema>;
export type ForgetPasswordType = z.infer<typeof forgetPasswordFormSchema>;
export type VerifyResetCodeType = z.infer<typeof verifyResetCodeFormSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordFormSchema>;
export type UpdateUserDataType = z.infer<typeof updateUserDataSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordFormSchema>;
