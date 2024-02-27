// TODO - fake pagination
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Pagination } from "@/ui/molecules/Pagination";
// import { getProductList } from "@/api/getProductList";
// import { AMOUNT_OF_PRODUCTS } from "@/constants";

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
		title: category.name,
		description: category.description,
	};
}

// TODO - generateStaticParams
// export async function generateStaticParams() {
// 	const { numOfProducts } = await getProductList({});

// 	const numOfPages = Math.ceil(numOfProducts / AMOUNT_OF_PRODUCTS);
// 	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

// 	return pages.map((page) => ({
// 		params: { page: String(page) },
// 	}));
// }

export default async function CategoryPage({ params }: CategoryPageType) {
	const { products } = await getProductsByCategory(params.categoryName);

	const numOfPages = Math.ceil(products.length / 4);

	if (
		Number(params.page) < 1 ||
		Number(params.page) > numOfPages ||
		isNaN(Number(params.page))
	) {
		return notFound();
	}

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
