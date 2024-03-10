import Link from "next/link";
import { Suspense } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { Searcher } from "../atoms/Searcher";
import { Cart } from "../atoms/Cart";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCategoryList } from "@/api/categories/getCategoryList";

export const Header = async () => {
	const t = await getTranslations("Header");

	const categories = await getCategoryList({});

	const navigation = [
		{
			label: t("home"),
			href: "/",
			exact: true,
		},
		{
			label: t("all"),
			href: "/products",
		},
		...categories
			.map(({ slug }) => ({
				label: t(slug),
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
					<Searcher i18n={{ placecholder: t("search") }} />
				</Suspense>

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
