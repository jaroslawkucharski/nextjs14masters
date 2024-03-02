import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/ui/organisms/Header";

type RootLayoutType = {
	children: ReactNode;
	modal: ReactNode;
};

const lato = Lato({
	subsets: ["latin", "latin-ext"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Home",
	description: "Home page.",
};

const navigationLinks = [
	{
		label: "Home",
		href: "/",
		exact: true,
	},
	{
		label: "All",
		href: "/products",
	},
	{
		label: "T-Shirts",
		href: "/categories/t-shirts",
	},
	{
		label: "Hoodies",
		href: "/categories/hoodies",
	},
	{
		label: "Accessories",
		href: "/categories/accessories",
	},
];

export default function RootLayout({
	children,
	modal,
}: Readonly<RootLayoutType>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={lato.className}>
					<Header navigation={navigationLinks} />

					{children}

					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
