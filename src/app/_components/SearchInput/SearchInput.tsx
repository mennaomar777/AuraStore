"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const query = value.trim();

      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else if (pathname === "/search") {
        router.push("/search");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value, pathname, router]);

  useEffect(() => {
    if (pathname !== "/search") {
      setValue("");
    }
  }, [pathname]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = value.trim();

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <Field>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          name="q"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full min-w-0 rounded-full border border-gray-200 bg-white py-5 pl-5 pr-10 dark:border-gray-700 dark:bg-gray-900 dark:text-white xl:w-80 focus:border-primary-500 focus:ring-primary-100/30 placeholder:text-gray-400 dark:placeholder:text-gray-300"
        />

        <Button
          type="submit"
          size="icon"
          aria-label="Search"
          className="absolute right-1 top-1/2 -translate-y-1/2 me-1 size-8 cursor-pointer rounded-full bg-primary-600 text-white hover:bg-primary-700"
        >
          <Search size={18} />
        </Button>
      </form>
    </Field>
  );
}
