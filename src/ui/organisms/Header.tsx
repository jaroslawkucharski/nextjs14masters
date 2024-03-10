import Link from "next/link";
import { Suspense } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getLocale, getTranslations } from "next-intl/server";
import { Globe } from "lucide-react";
import { Searcher } from "@/ui/atoms/Searcher";
import { Cart } from "@/ui/atoms/Cart";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCategoryList } from "@/api/categories/getCategoryList";

export const Header = async () => {
	const lang = await getLocale();

	const t = await getTranslations();

	const categories = await getCategoryList({});

	const navigation = [
		{
			label: t("word-home"),
			href: "/",
			exact: true,
		},
		{
			label: t("word-all-products"),
			href: "/products",
		},
		...categories
			.map(({ slug }) => ({
				label: t(`word-${slug}`),
				href: `/categories/${slug}`,
			}))
			.reverse(),
	];

	return (
		<header className="static top-0 z-10 flex h-fit w-full flex-col justify-center gap-12 border-b bg-white px-12 py-4 max-lg:justify-between lg:fixed lg:flex-row">
			<Link href={{ pathname: "/" }} className="self-center">
				<Logo />
			</Link>

			<Navigation navigation={navigation} />

			<div className="flex flex-1 flex-col justify-end gap-8 lg:flex-row">
				<Suspense>
					<Searcher i18n={{ placecholder: t("word-search") }} />
				</Suspense>

				<Link
					href={`/${lang === "pl" ? "en" : "pl"}`}
					className="flex items-center gap-1 self-center font-bold"
				>
					{lang.toLocaleUpperCase()} <Globe className="h-5 w-5" />
				</Link>

				<Cart />

				<SignedIn>
					<UserButton userProfileMode="navigation" afterSignOutUrl="/" />
				</SignedIn>

				<SignedOut>
					<SignInButton />
				</SignedOut>
			</div>
		</header>
	);
};
