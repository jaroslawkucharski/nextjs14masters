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

export default async function ProductsPage() {
	const products = await getProducts({ take: "20" });

	return <ProductsList products={products} />;
}
