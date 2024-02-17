import type { Metadata } from "next";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCategory } from "@/api/products";

export const metadata: Metadata = {
	title: "Category - Next.js Masters",
	description: "Home page.",
};

export default async function CategoryPage({
	params,
}: {
	params: { category: string };
}) {
	const { products } = await getProductsByCategory(params.category);

	return <ProductsList products={products} />;
}
