import { type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { getProductsByCategory } from "@/api/products/getProductsByCategory";
import { PageHeading } from "@/ui/molecules/PageHeading";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		categoryName: string;
	};
};

export default async function CategoryLayout({
	children,
	params,
}: ProductsLayoutType) {
	const t = await getTranslations("Category");

	const { category } = await getProductsByCategory(params.categoryName);

	return (
		<>
			<PageHeading
				title={t(category.slug)}
				description={t(`${category.slug}-description`)}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}
			</section>
		</>
	);
}
