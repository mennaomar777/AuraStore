"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import type { CSSProperties } from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      duration={4500}
      gap={10}
      expand
      visibleToasts={4}
      offset={20}
      mobileOffset={16}
      icons={{
        success: <CircleCheckIcon className="size-5" strokeWidth={2.25} />,
        info: <InfoIcon className="size-5" strokeWidth={2.25} />,
        warning: <TriangleAlertIcon className="size-5" strokeWidth={2.25} />,
        error: <OctagonXIcon className="size-5" strokeWidth={2.25} />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1rem",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast !overflow-hidden !rounded-2xl !border !py-3.5 !pr-12 !pl-4 !shadow-lg !shadow-gray-950/[0.06] !font-exo dark:!shadow-black/20",

          title:
            "!text-sm !font-semibold !leading-5 !tracking-tight !text-gray-900 dark:!text-gray-100",

          description:
            "!mt-1 !text-xs !leading-5 !text-gray-600 dark:!text-gray-400",

          icon: "!mr-1 !mt-0.5 !size-5 !shrink-0",

          closeButton:
            "!absolute !left-auto !right-0.5 !top-1/2 !size-7 !-translate-y-1/2 !translate-x-0 !rounded-full !border-0 !bg-transparent !text-current !opacity-60 !shadow-none !transition-colors hover:!bg-black/[0.06] hover:!opacity-100 focus-visible:!ring-2 focus-visible:!ring-current/30 dark:hover:!bg-white/10",

          actionButton:
            "!h-8 !rounded-lg !bg-primary-600 !px-3 !text-xs !font-semibold !text-white !transition-colors hover:!bg-primary-700",

          cancelButton:
            "!h-8 !rounded-lg !border !border-gray-200 !bg-transparent !px-3 !text-xs !font-medium !text-gray-700 hover:!bg-gray-100 dark:!border-gray-700 dark:!text-gray-200 dark:hover:!bg-gray-800",

          success:
            "!border-emerald-200 dark:!border-emerald-900/70 [&_[data-icon]]:!text-emerald-600 dark:[&_[data-icon]]:!text-emerald-400",

          error:
            "!border-rose-200 dark:!border-rose-900/70 [&_[data-icon]]:!text-rose-600 dark:[&_[data-icon]]:!text-rose-400",

          warning:
            "!border-amber-200 dark:!border-amber-900/70 [&_[data-icon]]:!text-amber-600 dark:[&_[data-icon]]:!text-amber-400",

          info: "!border-sky-200 dark:!border-sky-900/70 [&_[data-icon]]:!text-sky-600 dark:[&_[data-icon]]:!text-sky-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
