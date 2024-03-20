import Link from "next/link";
import { Suspense } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { UserMenu } from "../molecules/UserMenu";
import { MobileNavigation } from "../molecules/MobileNavigation";
import { Searcher } from "@/ui/atoms/Searcher";
import { Cart } from "@/ui/atoms/Cart";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCategoryList } from "@/api/categories/getCategoryList";
import { PATHS } from "@/constants";

export const Header = async () => {
	const t = await getTranslations();

	const categories = await getCategoryList({});

	const navigation = [
		{
			label: t("word-home"),
			href: PATHS.HOME,
			exact: true,
		},
		{
			label: t("word-all-products"),
			href: PATHS.PRODUCTS,
		},
		...categories
			.map(({ slug }) => ({
				label: t(`word-${slug}`),
				href: `${PATHS.CATEGORIES}/${slug}`,
			}))
			.toReversed(),
	];

	const renderNavigation = () => <Navigation navigation={navigation} />;

	const renderSearcher = () => (
		<Suspense>
			<Searcher i18n={{ placecholder: t("word-search") }} />
		</Suspense>
	);

	return (
		<header className="fixed top-0 z-10 h-fit w-full flex-col bg-white px-12 py-6 max-lg:static">
			<div className="mx-auto flex justify-center gap-12 max-lg:justify-between lg:max-w-7xl">
				<Link href={{ pathname: PATHS.HOME }} className="self-center">
					<Logo />
				</Link>

				<div className="static self-center max-lg:hidden">
					{renderNavigation()}
				</div>

				<div className="flex flex-1 items-center justify-end gap-8">
					<div className="static self-center max-md:hidden">
						{renderSearcher()}
					</div>

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

					<Suspense>
						<MobileNavigation>{renderNavigation()}</MobileNavigation>
					</Suspense>
				</div>
			</div>

			<div className="static my-4 md:hidden">{renderSearcher()}</div>
		</header>
	);
};
