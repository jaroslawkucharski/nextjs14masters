import { type Metadata } from "next";

import { getProducts } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export async function generateStaticParams({
	params,
}: {
	params: { page: string };
}) {
	const products = await getProducts({ take: "20", offset: params.page });

	return products;
}

export default async function ProductsPage({
	params,
}: {
	params: { page: string };
}) {
	const products = await getProducts({ take: "20", offset: params.page });

	return <ProductsList products={products} />;
}
