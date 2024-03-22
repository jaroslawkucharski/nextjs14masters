import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { LANGUAGES } from "./constants";

export const locales = [LANGUAGES.EN, LANGUAGES.PL] as const;
export const defaultLocale = LANGUAGES.EN;
export const localePrefix = "never" as const;

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix });
