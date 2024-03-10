import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { Header } from "@/ui/organisms/Header";

type RootLayoutType = {
	children: ReactNode;
	modal: ReactNode;
	params: { locales: string };
};

const lato = Lato({
	subsets: ["latin", "latin-ext"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations("Home");

	return {
		title: t("title"),
		description: t("description"),
	};
};

export default function RootLayout({
	children,
	modal,
	params,
}: Readonly<RootLayoutType>) {
	return (
		<ClerkProvider>
			<html lang={params.locales}>
				<body className={lato.className}>
					<Header />

					<main className="lg:mt-20">{children}</main>

					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
