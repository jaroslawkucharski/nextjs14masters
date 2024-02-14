import { type Metadata } from "next";

import { getProducts } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsPage({
	params,
}: {
	params: { page: string };
}) {
	const products = await getProducts({
		take: AMOUNT_OF_PRODUCTS,
		offset: params.page,
	});

	return <ProductsList products={products} />;
}
