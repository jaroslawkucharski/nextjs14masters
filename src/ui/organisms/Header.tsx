import Link from "next/link";
import { Suspense } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { UserMenu } from "../molecules/UserMenu";
import { Searcher } from "@/ui/atoms/Searcher";
import { Cart } from "@/ui/atoms/Cart";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCategoryList } from "@/api/categories/getCategoryList";

export const Header = async () => {
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
		<header className="static top-0 z-10 h-fit w-full bg-white px-12 py-6 lg:fixed">
			<div className="mx-auto flex flex-col justify-center gap-12 max-lg:justify-between sm:max-w-2xl md:max-w-4xl lg:max-w-7xl lg:flex-row">
				<Link href={{ pathname: "/" }} className="self-center">
					<Logo />
				</Link>

				<Navigation navigation={navigation} />

				<div className="flex flex-1 flex-col items-center justify-end gap-8 lg:flex-row">
					<Suspense>
						<Searcher i18n={{ placecholder: t("word-search") }} />
					</Suspense>

					<Cart />

					<SignedIn>
						<UserMenu
							i18n={{
								orders: t("word-orders"),
								settings: t("word-settings"),
								logOut: t("word-log-out"),
							}}
						/>
					</SignedIn>

					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</div>
		</header>
	);
};
