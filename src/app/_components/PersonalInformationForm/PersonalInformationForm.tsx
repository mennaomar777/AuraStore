"use client";
import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateUserDataSchema,
  UpdateUserDataType,
} from "@/schemas/auth.schema";

import { Button } from "@/components/ui/button";
import { updateUserData } from "@/services/profile";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
export default function PersonalInformationForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: session, update } = useSession();

  const form = useForm<UpdateUserDataType>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!session?.user) return;

    const currentPhone = form.getValues("phone");
    form.reset({
      name: session.user.name ?? "",
      email: session.user.email ?? "",
      phone: session.user.phone ?? currentPhone,
    });
  }, [session, form.reset, form]);

  async function handleUserDataUpdating(values: UpdateUserDataType) {
    try {
      setIsLoading(true);
      const res = await updateUserData(values);

      if (res.message === "success") {
        form.reset({
          name: res.user.name,
          email: res.user.email,
          phone: values.phone,
        });
        await update({
          name: res.user.name,
          email: res.user.email,
          phone: values.phone,
        });

        toast.success("Profile updated successfully.");
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
      <Card className="w-full gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0 shadow-none">
        <CardHeader className="px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-primary-700 dark:bg-emerald-950 dark:text-emerald-300">
              <UserRound size={20} />
            </span>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                Personal information
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Review and update your account details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
          <form
            id="update-info-form"
            onSubmit={form.handleSubmit(handleUserDataUpdating)}
            className="space-y-5"
          >
            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Name
                    </FieldLabel>
                    <div className="relative">
                      <UserRound
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your name"
                        autoComplete="name"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Email address
                    </FieldLabel>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email address"
                        autoComplete="email"
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2 sm:col-span-2"
                  >
                    <FieldLabel
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Phone Number
                    </FieldLabel>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        {...field}
                        id="phone"
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your phone"
                        autoComplete="tel"
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
              className="inline-flex h-10 w-fit cursor-pointer items-center gap-2 rounded-md bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              form="update-info-form"
              disabled={isLoading}
            >
              <Save size={16} />
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-start bg-gray-50/70 border-t-0 px-5 py-4 dark:bg-gray-950/50 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck size={14} className="text-primary-600" />
            Your account information stays protected
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
