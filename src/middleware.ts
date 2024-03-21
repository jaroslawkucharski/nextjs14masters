import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "@/navigation";

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
});

export default authMiddleware({
	beforeAuth: (req) => {
		return intlMiddleware(req);
	},

	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/categories/(.*)",
		"/collections/(.*)",
		"/product/(.*)",
		"/products/(.*)",
		"/sign-in",
		"/sign-up",
		"/sign-in/(.*)",
		"/sign-up/(.*)",

		"/:locale",
		"/:locale/search",
		"/:locale/cart",
		"/:locale/categories/(.*)",
		"/:locale/collections/(.*)",
		"/:locale/product/(.*)",
		"/:locale/products/(.*)",
		"/:locale/sign-in",
		"/:locale/sign-up",
		"/:locale/sign-in/(.*)",
		"/:locale/sign-up/(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
