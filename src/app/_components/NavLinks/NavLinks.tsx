"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Category } from "@/types/categories";

const navCategoryNames = [
  "Electronics",
  "Women's Fashion",
  "Men's Fashion",
  "Beauty & Health",
];

export function NavLinks({ categories }: { categories: Category[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/"
              className="font-medium text-[16px] text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-all duration-300"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/products"
              className="font-medium text-[16px] text-gray-600  dark:text-gray-300 hover:text-primary-600 transition-all duration-300"
            >
              Shop
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium text-[16px] text-gray-600 dark:text-gray-300 hover:text-primary-600 cursor-pointer transition-all duration-300">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 font-medium px-0">
            <ul className="w-44 ">
              <ListItem
                href="/categories"
                className="hover:text-primary-600 hover:bg-primary-100/30 dark:hover:bg-gray-800"
              >
                All Categories
              </ListItem>
              {categories
                .filter((category) => navCategoryNames.includes(category.name))
                .map((category) => (
                  <ListItem
                    key={category._id}
                    href={`/categories/${category._id}`}
                    className="hover:text-primary-600 hover:bg-primary-100/30 dark:hover:bg-gray-800"
                  >
                    {category.name}
                  </ListItem>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/brands"
              className="font-medium text-[16px] text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-all duration-300"
            >
              Brands
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  children,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`block rounded-md p-3 text-sm font-medium transition-colors ${className}`}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
