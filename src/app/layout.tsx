import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { Header } from "@/ui/organisms/Header";

type RootLayoutType = {
	children: ReactNode;
};

const lato = Lato({
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Home - Next.js Masters",
	description: "Home page.",
};

export default function RootLayout({ children }: Readonly<RootLayoutType>) {
	return (
		<html lang="en">
			<body className={lato.className}>
				<Header />

				{children}
			</body>
		</html>
	);
}
