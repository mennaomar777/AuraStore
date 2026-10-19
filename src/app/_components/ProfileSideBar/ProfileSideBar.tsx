"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, MapPin, Settings } from "lucide-react";

export default function ProfileSideBar() {
  const pathName = usePathname();

  const activeLinkClasses =
    "bg-emerald-50 font-semibold text-primary-700 dark:bg-emerald-950/50 dark:text-emerald-300";
  const inactiveLinkClasses =
    "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800";

  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        My Account
      </p>

      <div className="space-y-1">
        <Link
          href="/profile/addresses"
          aria-current={pathName === "/profile/addresses" ? "page" : undefined}
          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
            pathName === "/profile/addresses"
              ? activeLinkClasses
              : inactiveLinkClasses
          }`}
        >
          <span className="flex items-center gap-2.5">
            <MapPin size={16} />
            My Addresses
          </span>
          <ArrowRight size={14} />
        </Link>

        <Link
          href="/profile"
          aria-current={pathName === "/profile" ? "page" : undefined}
          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
            pathName === "/profile" ? activeLinkClasses : inactiveLinkClasses
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Settings size={16} />
            Settings
          </span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </aside>
  );
}
