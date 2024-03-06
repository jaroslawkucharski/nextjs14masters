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

export default function RootLayout({
	children,
	modal,
}: Readonly<RootLayoutType>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={lato.className}>
					<Header />

					<main className="lg:mt-20">{children}</main>

					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
