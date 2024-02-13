import { type Metadata } from "next";

import { getProducts } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export async function generateStaticParams() {
	const products = await getProducts({ take: "20" });

	return products;
}

export default async function ProductsPage({
	params,
}: {
	params: { page: string };
}) {
	const offset =
		params.page === "1" ? "0" : String(Number(params.page) * 20 - 20);
	const products = await getProducts({ take: "20", offset: offset });

	return <ProductsList products={products} />;
}
