import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

const lato = Lato({
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Home - Next.js Masters",
	description: "Home page.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={lato.className}>
				<nav className="flex h-fit content-center justify-center gap-4 px-4">
					<ActiveLink href="/">Home</ActiveLink>

					<ActiveLink href="/products" exact>
						All
					</ActiveLink>
				</nav>

				<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
					{children}
				</section>
			</body>
		</html>
	);
}
