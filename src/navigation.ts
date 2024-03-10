import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "pl"] as const;
export const defaultLocale = "en" as const;
export const localePrefix = "never" as const;

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix });
