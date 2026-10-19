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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { signUpFormSchema, SignUpFormType } from "@/schemas/auth.schema";
import { signUpUser } from "@/services/auth";
import Add from "@/icons/Add.svg";
import Google from "@/icons/Google.svg";
import Facebook from "@/icons/Facebook.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });
  async function handleRegister(data: SignUpFormType) {
    try {
      setIsLoading(true);
      const finalRes = await signUpUser({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      });

      toast.success("Account created successfully");

      router.push("/signIn");

      return finalRes;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Card className="w-full md:max-w-[46%] py-10 px-2 shadow-lg ring-0 bg-white dark:bg-dark-900 border border-transparent dark:border-dark-700">
      <CardHeader>
        <CardTitle className="text-center capitalize text-3xl font-semibold leading-9 text-gray-600 dark:text-white">
          {" "}
          create your account
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-300 font-medium leading-6">
          {" "}
          Start your fresh journey with us today
        </CardDescription>
        <div className="grid grid-cols-2 gap-2 my-6">
          <Button
            type="button"
            className="py-5 border border-gray-300 dark:border-dark-700 font-semibold cursor-pointer hover:bg-gray-100/70 dark:hover:bg-dark-800 bg-white dark:bg-dark-900 text-black dark:text-white"
          >
            <Image src={Google} alt="google-icon" width={20} height={20} />
            Google
          </Button>
          <Button
            type="button"
            className="py-5 border border-gray-300 dark:border-dark-700 font-semibold cursor-pointer hover:bg-gray-100/70 dark:hover:bg-dark-800 bg-white dark:bg-dark-900 text-black dark:text-white"
          >
            <Image src={Facebook} alt="facebook-icon" width={20} height={20} />
            Facebook
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <span className="or text-gray-600 dark:text-gray-300 font-medium text-[17px]">
            or
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(handleRegister)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel
                    htmlFor="name"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="name"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel
                    htmlFor="email"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
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
                  <FieldLabel
                    htmlFor="password"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="new-password"
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
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel
                    htmlFor="rePassword"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="rePassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    autoComplete="new-password"
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel
                    htmlFor="phone"
                    className="text-gray-600 dark:text-gray-200 text-lg font-medium"
                  >
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+20 111 905 1584"
                    autoComplete="tel"
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
              name="acceptTerms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center  gap-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      aria-invalid={fieldState.invalid}
                    />

                    <label
                      htmlFor="acceptTerms"
                      className="font-medium text-gray-600 dark:text-gray-300 text-[1.01rem] cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      *
                    </label>
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
        </form>
      </CardContent>
      <CardFooter className="border-t-0 pb-0">
        <Field orientation="horizontal">
          <Button
            className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white cursor-pointer text-lg py-6 disabled:opacity-70 disabled:cursor-not-allowed dark:hover:bg-primary-600 shadow-lg hover:shadow-xl"
            type="submit"
            form="sign-up-form"
            disabled={isLoading}
          >
            <div className="flex justify-center items-center gap-3">
              <Image src={Add} alt="" width={20} height={20} />
              {isLoading ? "Creating Account..." : "Create My Account"}
            </div>
          </Button>
        </Field>
      </CardFooter>
      <div className="w-[94%] mx-auto flex justify-center items-center text-[16px] font-medium border-t-2 border-gray-100/70 dark:border-dark-700">
        {" "}
        <p className="text-gray-600 dark:text-gray-300 my-10">
          {" "}
          Already have an account?{" "}
          <Link href="/signIn" className="text-primary-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </Card>
  );
}
