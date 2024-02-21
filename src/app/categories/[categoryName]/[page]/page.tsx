import type { Metadata } from "next";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Pagination } from "@/ui/molecules/Pagination";
import { getProductList } from "@/api/getProductList";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

export type CategoryPageType = {
	params: {
		categoryName: string;
		page: string;
	};
};

export async function generateMetadata({
	params,
}: CategoryPageType): Promise<Metadata> {
	const { category } = await getProductsByCategory(params.categoryName);

	return {
		title: `${category.name} - Next.js Masters`,
		description: category.description,
	};
}

export async function generateStaticParams() {
	const { numOfProducts } = await getProductList({});

	const numOfPages = Math.ceil(numOfProducts / AMOUNT_OF_PRODUCTS);
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

	return pages.map((page) => ({
		params: { page: String(page) },
	}));
}

export default async function CategoryPage({ params }: CategoryPageType) {
	const { products } = await getProductsByCategory(params.categoryName);

	return (
		<>
			<ProductsList products={products} />

			<Pagination
				totalItems={products.length}
				currentPage={Number(params.page)}
			/>
		</>
	);
}
