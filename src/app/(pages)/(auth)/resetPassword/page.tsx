import Image from "next/image";
import passwordImage from "@/images/password.png";
import { ResetPasswordForm } from "@/app/_components/ResetPasswordForm/ResetPasswordForm";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-white px-4 py-10 dark:bg-gray-950 sm:px-6 lg:py-14">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <section className="order-2 mx-auto w-full max-w-lg text-center lg:order-1 lg:max-w-none">
          <div className="relative aspect-[1.62] overflow-hidden rounded-2xl">
            <Image
              src={passwordImage}
              alt="Email and secure password reset illustration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Create a New Password
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-400">
            Choose a strong password to secure your AuraStore account.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={13} className="text-primary-600" /> Email verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-primary-600" /> Secure reset
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole size={13} className="text-primary-600" /> Encrypted
            </span>
          </div>
        </section>

        <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
