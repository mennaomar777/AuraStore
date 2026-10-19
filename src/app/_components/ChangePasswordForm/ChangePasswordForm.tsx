"use client";
import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ChangePasswordType,
  changePasswordFormSchema,
} from "@/schemas/auth.schema";

import { Button } from "@/components/ui/button";
import { updateUserPassword } from "@/services/profile";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
  });

  async function changeUserPass(values: ChangePasswordType) {
    try {
      setIsLoading(true);
      const res = await updateUserPassword(values);
      console.log(res);

      if (res.message === "success") {
        toast.success("Password updated successfully.");
        form.reset();
        await signOut({
          callbackUrl: "/signIn",
        });
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full gap-0 overflow-hidden rounded-2xl border border-gray-200 ring-0 bg-white p-0 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <CardHeader className="px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <LockKeyhole size={20} />
            </span>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                Change password
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Keep your account secure with a strong password.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
          <form
            id="change-pass-form"
            onSubmit={form.handleSubmit(changeUserPass)}
            className="space-y-5"
          >
            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2 sm:col-span-2"
                  >
                    <FieldLabel
                      htmlFor="currentPassword"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Current password
                    </FieldLabel>
                    <div className="relative">
                      <LockKeyhole
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <PasswordInput
                        {...field}
                        id="currentPassword"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your current password"
                        autoComplete="current-password"
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      New password
                    </FieldLabel>
                    <div className="relative">
                      <KeyRound
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <PasswordInput
                        {...field}
                        id="password"
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
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="rePassword"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Confirm new password
                    </FieldLabel>
                    <div className="relative">
                      <KeyRound
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <PasswordInput
                        {...field}
                        id="rePassword"
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
              className="inline-flex h-10 w-fit cursor-pointer items-center gap-2 rounded-md bg-amber-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              form="change-pass-form"
              disabled={isLoading}
            >
              <KeyRound size={16} />

              {isLoading ? "Updating..." : "Update password"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-start rounded-b-sm border-t border-gray-100 bg-gray-50/70 px-5 py-4 dark:border-gray-800 dark:bg-gray-950/50 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck size={14} className="text-amber-600" />
            Your account information stays protected
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
