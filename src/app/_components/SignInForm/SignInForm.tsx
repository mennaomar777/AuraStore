"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { PasswordInput } from "@/components/ui/password-input";
import { signInFormSchema, SignInFormType } from "@/schemas/auth.schema";
import Google from "@/icons/Google.svg";
import Facebook from "@/icons/Facebook.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Lock from "@/icons/Lock.svg";
import People from "@/icons/People.svg";
import star from "@/icons/Gray-Star.svg";
import { LoaderCircle } from "lucide-react";

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  async function handleLogin(data: SignInFormType) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Login Successful");
      router.push("/");

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
    <Card className="w-full rounded-3xl border border-gray-200/80 bg-white px-5 py-8 shadow-xl shadow-gray-900/5 ring-0 dark:border-dark-700 dark:bg-dark-900 sm:px-8 sm:py-10">
      <CardHeader>
        <CardTitle className="text-center capitalize text-3xl font-semibold leading-9 text-gray-800 dark:text-white">
          {" "}
          <span className="text-primary-600">Aura</span>Store
          <p className="mt-3 mb-1"> Welcome Back!</p>
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-300 font-medium leading-6">
          {" "}
          Sign in to continue your fresh shopping experience
        </CardDescription>
        <div className="grid grid-cols-1 gap-2 my-6">
          <Button
            type="button"
            className="py-5 border border-gray-300 dark:border-dark-700 font-semibold cursor-pointer hover:bg-gray-100/70 dark:hover:bg-dark-800 bg-white dark:bg-dark-900 text-black dark:text-white"
          >
            <Image src={Google} alt="google-icon" width={20} height={20} />
            Continue with Google
          </Button>
          <Button
            type="button"
            className="py-5 border border-gray-300 dark:border-dark-700 font-semibold cursor-pointer hover:bg-gray-100/70 dark:hover:bg-dark-800 bg-white dark:bg-dark-900 text-black dark:text-white"
          >
            <Image src={Facebook} alt="facebook-icon" width={20} height={20} />
            Continue with Facebook
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <span className="or-sign-in text-gray-600 dark:text-gray-300 font-medium">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(handleLogin)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel
                    htmlFor="email"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="rounded-md border-gray-300 dark:border-dark-700 py-5 bg-white dark:bg-dark-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                    disabled={isLoading}
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <div className="flex justify-between items-center">
                    <FieldLabel
                      htmlFor="password"
                      className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                    >
                      Password
                    </FieldLabel>
                    <Link
                      href="/forgetPassword"
                      className="rounded-md px-2 py-1 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-primary-400 dark:hover:bg-primary-950/40 dark:hover:text-primary-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="enter your password"
                    autoComplete="current-password"
                    className="rounded-md border-gray-300 dark:border-dark-700 py-5 bg-white dark:bg-dark-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                    disabled={isLoading}
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" disabled={isLoading} />

                <label
                  htmlFor="remember"
                  className="font-medium text-gray-600 dark:text-gray-300 text-[1.01rem] cursor-pointer"
                >
                  Keep me signed in
                </label>
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="border-0 bg-transparent p-0">
        <Button
          className="w-full cursor-pointer rounded-xl bg-primary-600 py-6 text-lg text-white shadow-lg hover:bg-primary-700 hover:shadow-xl disabled:cursor-wait disabled:opacity-70 dark:hover:bg-primary-600"
          type="submit"
          form="sign-in-form"
          disabled={isLoading}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading && (
              <LoaderCircle
                aria-hidden="true"
                className="size-5 animate-spin"
              />
            )}
            {isLoading ? "Signing In..." : "Sign In"}
          </span>
        </Button>
      </CardFooter>
      <div className="w-[94%] mx-auto flex justify-center items-center text-[16px] font-medium border-t-2 border-gray-100/70 dark:border-dark-700">
        {" "}
        <p className="text-gray-600 dark:text-gray-300 mt-8">
          {" "}
          New to AuraStore?
          <Link
            href="/signUp"
            className="text-primary-600 hover:underline ps-2 font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 mt-2 mb-10">
        <div className="flex justify-center items-center gap-1.5">
          <Image src={Lock} alt="truck-icon" width={9} height={9} />
          <span className="text-gray-400 text-xs font-medium">SSL Secured</span>
        </div>
        <div className="flex justify-center items-center gap-1.5">
          <Image src={People} alt="truck-icon" width={15} height={10} />
          <span className="text-gray-400 text-xs font-medium">50K+ Users</span>
        </div>
        <div className="flex justify-center items-center gap-1.5">
          <Image src={star} alt="truck-icon" width={15} height={12} />
          <span className="text-gray-400 text-xs font-medium">4.9 Rating</span>
        </div>
      </div>
    </Card>
  );
}
