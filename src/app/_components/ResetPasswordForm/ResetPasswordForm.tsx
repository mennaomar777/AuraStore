"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  resetPasswordFormSchema,
  ResetPasswordType,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/services/auth";
import { ArrowLeft, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearResetEmail } from "@/redux/slices/passwordResetSlice";
import type { RootState } from "@/redux/store";

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const resetEmail = useSelector(
    (state: RootState) => state.passwordReset.email,
  );
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  async function handleResetPassword(data: ResetPasswordType) {
    try {
      setIsLoading(true);
      if (!resetEmail) {
        toast.error("Please restart the password reset process.");
        router.replace("/forgetPassword");
        return;
      }
      const res = await resetPassword({
        email: resetEmail,
        newPassword: data.newPassword,
      });
      toast.success("Password reset successfully. Please sign in.");
      dispatch(clearResetEmail());
      router.push("/signIn");

      return res;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Card className="w-full gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 ring-0 shadow-xl shadow-gray-900/10 dark:bg-gray-900 dark:shadow-black/25">
      <CardHeader className="items-center px-6 pb-5 pt-7 text-center sm:px-8 sm:pt-8">
        <span className="mb-3 text-sm font-bold tracking-wide text-primary-700 dark:text-primary-400">
          AuraStore
        </span>
        <CardTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a new password
        </CardTitle>
        <CardDescription className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
          Choose a strong password to finish securing your account.
        </CardDescription>
        <div
          className="mt-5 flex items-center justify-center"
          aria-label="Step 3 of 3: create a new password"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
            <Check size={14} />
          </span>
          <span className="mx-2 h-px w-8 bg-primary-300 dark:bg-primary-800" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
            <Check size={14} />
          </span>
          <span className="mx-2 h-px w-8 bg-primary-300 dark:bg-primary-800" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 ring-3 ring-primary-100/50 text-white">
            <LockKeyhole size={14} />
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-7 sm:px-10 sm:pb-9">
        <form
          id="sign-in-form"
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="space-y-5"
        >
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel
                    htmlFor="newPass"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    New password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      {...field}
                      id="newPass"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-300"
                      disabled={isLoading}
                    />
                  </div>
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
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      className="h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-300"
                      disabled={isLoading}
                    />
                  </div>
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

          <Button
            className="h-12 w-full cursor-pointer rounded-xl bg-primary-600 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            form="sign-in-form"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update password"}
          </Button>
        </form>
        <div className="mt-5 text-center">
          <Link
            href="/verifyResetCode"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 transition hover:text-primary-800 hover:underline dark:text-primary-400"
          >
            <ArrowLeft size={13} /> Back to verification
          </Link>
        </div>
      </CardContent>

      <CardFooter className="justify-center rounded-b-none border-t border-gray-100 bg-gray-50/80 px-4 py-5 dark:border-gray-800 dark:bg-gray-950/35 sm:px-10">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            href="/signIn"
            className="font-semibold text-primary-700 transition hover:text-primary-800 hover:underline dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>

      <div className="mt-3 flex items-center justify-center gap-2 px-6 pb-6 text-xs text-gray-500 dark:text-gray-300">
        <ShieldCheck size={14} className="text-primary-600" />
        Your password reset is protected
      </div>
    </Card>
  );
}
