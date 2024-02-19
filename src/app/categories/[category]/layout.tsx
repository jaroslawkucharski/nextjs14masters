import { type ReactNode } from "react";
import { getProductsByCategory } from "@/api/products";
import { PageHeading } from "@/ui/atoms/PageHeading";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		category: string;
	};
};

export default async function CategoryLayout({
	children,
	params,
}: ProductsLayoutType) {
	const { category } = await getProductsByCategory(params.category);

	return (
		<>
			<PageHeading title={category.name} description={category.description} />

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}
			</section>
		</>
	);
}
