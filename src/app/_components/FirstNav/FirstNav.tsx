"use client";

import Image from "next/image";
import React from "react";
import Truck from "@/icons/Small-truck.svg";
import Gift from "@/icons/Gift.svg";
import { Mail, Phone, User, UserPlus, LogOut } from "lucide-react";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function FirstNav() {
  const { status, data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="hidden flex-wrap items-center justify-between gap-y-2 border-b border-gray-200 px-5 py-3 dark:border-gray-800 dark:bg-gray-950 xl:flex">
      <div className="flex justify-center items-center gap-6">
        <div className="flex justify-center items-center gap-1.5">
          <Image src={Truck} alt="truck-img" width={15} height={12} />
          <p className="font-medium text-sm text-gray-400 dark:text-gray-300">
            Free Shipping on Orders 500 EGP
          </p>
        </div>

        <div className="flex justify-center items-center gap-1.5">
          <Image src={Gift} alt="truck-img" width={12} height={12} />
          <p className="font-medium text-sm text-gray-400 dark:text-gray-300">
            New Arrivals Daily
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="flex justify-center items-center gap-6">
          <Link
            href="tel:+1 (800) 123-4567"
            className="text-gray-400 dark:text-gray-300 hover:text-primary-600 text-sm"
          >
            <div className="flex justify-center items-center gap-1.5">
              <Phone size={14} />
              <p className="font-medium text-sm">+1 (800) 123-4567</p>
            </div>
          </Link>

          <Link
            href="mailto:support@AuraStore.com"
            className="text-gray-400 dark:text-gray-300 hover:text-primary-600 text-sm"
          >
            <div className="flex justify-center items-center gap-1.5">
              <Mail size={14} />
              <p className="font-medium text-sm">support@AuraStore.com</p>
            </div>
          </Link>
        </div>

        <div className="w-px h-4 bg-gray-300/50 dark:bg-gray-700"></div>

        {/* AUTH SECTION */}
        <div className="flex justify-center items-center gap-3">
          {status === "loading" ? (
            <p className="text-sm text-gray-400 dark:text-gray-300">...</p>
          ) : !session ? (
            <>
              <Link
                href="/signIn"
                className="text-gray-500 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                <div className="flex justify-center items-center gap-1.5">
                  <User size={14} />
                  <p className="font-medium text-sm">Sign In</p>
                </div>
              </Link>

              <Link
                href="/signUp"
                className="text-gray-500 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                <div className="flex justify-center items-center gap-1.5">
                  <UserPlus size={14} />
                  <p className="font-medium text-sm">Sign Up</p>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="text-gray-500 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                <div className="flex justify-center items-center gap-1.5">
                  <User size={14} />
                  <span className="font-medium text-sm">
                    {user?.name || "User"}
                  </span>
                </div>
              </Link>

              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300 hover:text-red-500 transition-colors cursor-pointer px-2 py-1 rounded-md"
              >
                <LogOut size={14} />
                <p className="font-medium text-sm">Sign Out</p>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
