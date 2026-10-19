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
  verifyResetCodeFormSchema,
  VerifyResetCodeType,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { verifyResetCode } from "@/services/auth";
import { ArrowLeft, Check, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

export function VerifyResetCodeForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<VerifyResetCodeType>({
    resolver: zodResolver(verifyResetCodeFormSchema),
    defaultValues: {
      resetCode: "",
    },
    mode: "onChange",
  });
  async function handleVerifyResetCode(data: VerifyResetCodeType) {
    try {
      setIsLoading(true);
      const res = await verifyResetCode(data);
      if (res.status !== "Success") {
        toast.error(res.error);
        return;
      }
      toast.success("Reset code verified.");
      router.push("/resetPassword");

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
          Verify your reset code
        </CardTitle>
        <CardDescription className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
          Enter the code we sent to your email to continue.
        </CardDescription>
        <div
          className="mt-5 flex items-center justify-center"
          aria-label="Step 2 of 3: verify your code"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
            <Check size={14} />
          </span>
          <span className="mx-2 h-px w-8 bg-primary-300 dark:bg-primary-800" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 ring-3 ring-primary-100/50 text-white">
            <KeyRound size={14} />
          </span>
          <span className="mx-2 h-px w-8 bg-gray-200 dark:bg-gray-700" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
            <LockKeyhole size={14} />
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-7 sm:px-10 sm:pb-9">
        <form
          id="sign-in-form"
          onSubmit={form.handleSubmit(handleVerifyResetCode)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="resetCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel
                    htmlFor="resetCode"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Reset code
                  </FieldLabel>
                  <div className="relative">
                    <KeyRound
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      {...field}
                      id="resetCode"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your code"
                      autoComplete="one-time-code"
                      className="h-12 rounded-lg border-gray-200 bg-white pl-10 text-center text-lg font-semibold tracking-[0.3em] text-gray-900 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-300"
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
            {isLoading ? "Verifying..." : "Verify code"}
          </Button>
        </form>
        <div className="mt-5 text-center">
          <Link
            href="/forgetPassword"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 transition hover:text-primary-800 hover:underline dark:text-primary-400"
          >
            <ArrowLeft size={13} /> Back to Forgot Password
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





