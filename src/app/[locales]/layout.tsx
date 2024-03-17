import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { plPL, enUS } from "@clerk/localizations";
import { Header } from "@/ui/organisms/Header";
import { Footer } from "@/ui/organisms/Footer";

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
		<ClerkProvider localization={params.locales === "pl" ? plPL : enUS}>
			<html lang={params.locales}>
				<body className={lato.className}>
					<Header />

					<main className="mx-auto min-h-[calc(100vh_-_278px)] lg:max-w-7xl lg:pt-[88px]">
						{children}
					</main>

					{modal}

					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
