import Link from "next/link";
import { Suspense } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Searcher } from "../atoms/Searcher";
import { Cart } from "../atoms/Cart";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCategoryList } from "@/api/categories/getCategoryList";

export const Header = async () => {
	const categories = await getCategoryList({});

	const navigation = [
		{
			label: "Home",
			href: "/",
			exact: true,
		},
		{
			label: "All",
			href: "/products",
		},
		...categories
			.map(({ name, slug }) => ({
				label: name,
				href: `/categories/${slug}`,
			}))
			.reverse(),
	];

	return (
		<header className="static top-0 z-10 flex h-fit w-full flex-col justify-center gap-12 border-b bg-white px-12 py-4 max-lg:justify-between lg:fixed lg:flex-row">
			<Link href="/" className="self-center">
				<Logo />
			</Link>

			<Navigation navigation={navigation} />

			<div className="flex flex-1 flex-col justify-end gap-8 lg:flex-row">
				<Suspense>
					<Searcher />
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
