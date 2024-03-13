import { getTranslations } from "next-intl/server";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FooterNavigation } from "../molecules/FooterNavigation";
import { Logo } from "@/ui/atoms/Logo";
import { getCategoryList } from "@/api/categories/getCategoryList";
import { getCollectionsList } from "@/api/collections/getCollectionList";

export const Footer = async () => {
	const t = await getTranslations();

	const categoriesData = await getCategoryList({});
	const collectionsData = await getCollectionsList({});

	const navigation = [
		{
			label: t("word-categories"),
			items: [
				{
					label: t("word-all-products"),
					href: "/products",
				},
				...categoriesData
					.map(({ slug }) => ({
						label: t(`word-${slug}`),
						href: `/categories/${slug}`,
					}))
					.toReversed(),
			],
		},
		{
			label: t("word-collections"),
			items: [
				...collectionsData
					.map(({ slug }) => ({
						label: t(`word-${slug}`),
						href: `/collections/${slug}`,
					}))
					.toReversed(),
			],
		},
		{
			label: t("word-information"),
			items: [
				{
					label: t("word-privacy-policy"),
					href: "/privacy-policy",
				},
				{
					label: t("word-contact"),
					href: "/contact",
				},
			],
		},
		{
			label: t("word-language"),
			items: [
				{
					label: t("word-english"),
					href: "/en",
					img: "/images/en.png",
				},
				{
					label: t("word-polish"),
					href: "/pl",
					img: "/images/pl.png",
				},
			],
		},
	];

	return (
		<footer className="top-0 z-10 h-fit w-full bg-gray-950 px-12 pb-4 pt-12">
			<div className="mx-auto flex flex-col justify-center gap-4 max-lg:justify-between sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
				<section className="flex flex-wrap items-start justify-center gap-14 sm:justify-between">
					<div className="flex flex-col items-start justify-start gap-6">
						<div className="flex items-center justify-start gap-2">
							<Logo color="light" />

							<p className="flex flex-col text-2xl text-white">
								{t("word-nextshop")}
							</p>
						</div>

						<div className="flex items-start justify-start gap-4">
							<p className="flex flex-col text-sm font-light text-gray-300">
								{t("word-nextshop-email")}
							</p>
						</div>
					</div>

					<FooterNavigation navigation={navigation} />
				</section>

				<hr className="mb-2 mt-6 h-0.5 border-0 bg-gray-900"></hr>

				<div className="flex items-center justify-between gap-4">
					<p className="text-xs font-light text-gray-400">
						{t("word-footer-rights-reserved", {
							year: new Date().getFullYear(),
						})}
					</p>

					<div className="flex items-center  gap-4">
						<Facebook className="h-5 w-5 text-gray-400" />

						<Instagram className="h-5 text-gray-400" />

						<Twitter className="w-5 text-gray-400" />
					</div>
				</div>
			</div>
		</footer>
	);
};
