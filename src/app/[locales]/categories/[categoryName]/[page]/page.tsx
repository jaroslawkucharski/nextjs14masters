import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCategory } from "@/api/products/getProductsByCategory";
import { Pagination } from "@/ui/molecules/Pagination";
import { getNumOfPages, returnProductsNotFound } from "@/helpers";
import { CATEGORY_AMOUNT_OF_PRODUCTS } from "@/constants";

export type CategoryPageType = {
	params: {
		categoryName: string;
		page: string;
	};
};

export async function generateMetadata({
	params,
}: CategoryPageType): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: t(`category-${params.categoryName}`),
		description: t(`category-${params.categoryName}-description`),
	};
}

export default async function CategoryPage({ params }: CategoryPageType) {
	const { products } = await getProductsByCategory(params.categoryName);

	const numOfPages = getNumOfPages(
		products.length,
		CATEGORY_AMOUNT_OF_PRODUCTS,
	);

	if (returnProductsNotFound(params.page, numOfPages)) {
		return notFound();
	}

	// Fake pagination - API problem
	const fakePagination =
		params.page === "1" ? products.slice(0, 4) : products.slice(4);

	return (
		<>
			<ProductsList products={fakePagination} />

			<Pagination
				totalItems={products.length}
				currentPage={Number(params.page)}
				path={`categories/${params.categoryName}`}
				limit={4}
			/>
		</>
	);
}
