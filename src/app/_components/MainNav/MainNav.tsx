"use client";

import Image from "next/image";
import React from "react";
import Cart from "@/icons/Cart.svg";
import SearchInput from "../SearchInput/SearchInput";
import { NavLinks } from "../NavLinks/NavLinks";
import {
  Heart,
  ShoppingCart,
  User,
  Headphones,
  UserCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { CartItem } from "@/types/cart";
import { Category } from "@/types/categories";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function MainNav({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { status, data: session } = useSession();
  const user = session?.user;
  const wishListCount = useSelector(
    (state: RootState) => state.wishlist.items.length,
  );
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total: number, item: CartItem) => total + item.count,
      0,
    ),
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  const mobileLinkClass =
    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-200 dark:hover:bg-gray-800";

  return (
    <nav className="sticky top-0 z-50 bg-white px-3 py-2.5 shadow dark:border-b dark:border-gray-800 dark:bg-gray-950 sm:px-5 sm:py-3">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <Link href="/" className="shrink-0">
          <span className="flex items-center gap-2">
            <Image src={Cart} alt="AuraStore icon" width={30} height={30} />
            <span className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl xl:text-[27px]">
              AuraStore
            </span>
          </span>
        </Link>

        <div className="hidden xl:block">
          <SearchInput />
        </div>

        <div className="hidden items-center gap-5 xl:flex">
          <NavLinks categories={categories} />

          <Link href="/contact" className="hover:opacity-70">
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-primary-100/30 p-3 dark:bg-emerald-950/70">
                <Headphones size={16} strokeWidth={2.25} className="text-primary-600 dark:text-emerald-300" />
              </span>
              <span className="text-xs">
                <span className="block text-gray-400 dark:text-gray-300">
                  Support
                </span>
                <span className="block font-semibold text-gray-900 dark:text-white">
                  24/7 Help
                </span>
              </span>
            </span>
          </Link>

          <div className="h-8 w-px bg-gray-300/70 dark:bg-gray-700" />

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/wishlist"
              aria-label={"Wishlist, " + wishListCount + " items"}
              className="relative rounded-full p-2.5 text-gray-400 transition-colors hover:bg-gray-200/30 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
            >
              <Heart size={20} />
              {wishListCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishListCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label={"Cart, " + cartItemsCount + " items"}
              className="relative rounded-full p-2.5 text-gray-400 transition-colors hover:bg-gray-200/30 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {status === "loading" ? (
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            ) : !session ? (
              <Link
                href="/signIn"
                className="flex items-center gap-1.5 rounded-full bg-primary-600 px-5 py-2.5 font-semibold text-white shadow transition hover:bg-primary-700"
              >
                <User size={14} />
                <span className="text-sm">Sign in</span>
              </Link>
            ) : (
              <Link
                href="/profile"
                className="flex cursor-pointer items-center gap-2 rounded-full p-2.5 text-gray-400 transition-colors hover:bg-gray-200/30 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
              >
                <UserCircle size={20} />
                <span className="text-sm font-medium">
                  {user?.name?.split(" ")[0]}
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 xl:hidden">
          <ThemeToggle />
          <Link
            href="/wishlist"
            aria-label={"Wishlist, " + wishListCount + " items"}
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Heart size={20} />
            {wishListCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {wishListCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label={"Cart, " + cartItemsCount + " items"}
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-600 text-white shadow-md shadow-primary-600/20 transition duration-200 hover:scale-105 hover:bg-primary-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-l-4 border-l-primary-500 border-t border-t-gray-100 ring-1 ring-black/5 bg-white px-5 pb-6 pt-4 shadow-xl dark:border-l-primary-400 dark:border-t-gray-800 dark:bg-gray-950 xl:hidden"
        >
          <div className="mb-4">
            <SearchInput />
          </div>

          <div className="space-y-0.5 border-b border-gray-100 pb-4 dark:border-gray-800">
            <Link href="/" onClick={closeMenu} className={mobileLinkClass}>
              Home
            </Link>
            <Link
              href="/products"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              Brands
            </Link>
          </div>

          <div className="space-y-1 border-b border-gray-100 py-4 dark:border-gray-800">
            <Link
              href="/wishlist"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100/40 text-red-500 dark:bg-emerald-950/50">
                <Heart size={17} />
              </span>
              <span>Wishlist</span>
              {wishListCount > 0 && (
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {wishListCount}
                </span>
              )}
            </Link>
            <Link href="/cart" onClick={closeMenu} className={mobileLinkClass}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-primary-600 dark:bg-emerald-950/50">
                <ShoppingCart size={17} />
              </span>
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          <div className="space-y-1 border-b border-gray-100 py-4 dark:border-gray-800">
            {status === "loading" ? (
              <p className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
                Loading account…
              </p>
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                    <UserCircle size={17} />
                  </span>
                  <span>{user?.name || "My account"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    void signOut();
                  }}
                  className="flex w-full items-center gap-3 cursor-pointer rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-emerald-950/50">
                    <LogOut size={17} />
                  </span>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signIn"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                    <User size={17} />
                  </span>
                  Sign in
                </Link>
                <Link
                  href="/signUp"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                    <User size={17} />
                  </span>
                  Sign up
                </Link>
              </>
            )}
          </div>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-primary-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Headphones size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
                Need help?
              </span>
              <span className="block text-sm text-primary-600">
                Contact Support
              </span>
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}
