import { type Metadata } from "next";

import { getProducts } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

export type ProductsPageType = {
	params: {
		page: string;
	};
};

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export async function generateStaticParams() {
	const products = await getProducts();

	const numOfPages = Math.ceil(products.length / Number(AMOUNT_OF_PRODUCTS));
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

	return pages.map((page) => ({
		params: { page: String(page) },
	}));
}

export default async function ProductsPage({ params }: ProductsPageType) {
	const offset = params.page
		? String(
				Number(params.page) * Number(AMOUNT_OF_PRODUCTS) -
					Number(AMOUNT_OF_PRODUCTS),
			)
		: "0";

	const products = await getProducts({
		take: AMOUNT_OF_PRODUCTS,
		offset,
	});

	return <ProductsList products={products} />;
}
