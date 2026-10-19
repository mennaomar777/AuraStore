import Link from "next/link";
import { ShieldCheck, UserRound } from "lucide-react";
import PersonalInformationForm from "@/app/_components/PersonalInformationForm/PersonalInformationForm";
import ChangePasswordForm from "@/app/_components/ChangePasswordForm/ChangePasswordForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ProfileSideBar from "@/app/_components/ProfileSideBar/ProfileSideBar";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signIn");
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
        <nav
          className="mb-5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            My Account
          </span>
        </nav>

        <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-primary-700 to-emerald-600 px-6 py-7 text-white shadow-xl shadow-emerald-900/10 sm:px-9 sm:py-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <UserRound size={24} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  Your AuraStore account
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  My Account
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                  Manage your profile, addresses, and account settings.
                </p>
              </div>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur">
              <ShieldCheck size={18} /> Account settings
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
          <ProfileSideBar />

          <section
            className="min-w-0 space-y-6"
            aria-labelledby="account-settings-heading"
          >
            <div>
              <h2
                id="account-settings-heading"
                className="text-lg font-bold text-gray-900 dark:text-white"
              >
                Account Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Update your profile information and manage your password.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <PersonalInformationForm />

              <div className="border-t border-gray-100 bg-gray-50/80 px-5 py-4 dark:border-gray-800 dark:bg-gray-950/50 sm:px-6">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
                  Account information
                </h3>
                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">User ID</p>
                    <p className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                      {session.user.id ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-end justify-between sm:justify-self-stretch">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Role</p>
                      <p className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                        {session.user.role ?? "—"}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-primary-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Active account
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ChangePasswordForm />
          </section>
        </div>
      </div>
    </div>
  );
}
