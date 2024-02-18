import type { Metadata } from "next";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCategory } from "@/api/products";

export type CategoryPageType = {
	params: {
		category: string;
	};
};

export async function generateMetadata({
	params,
}: CategoryPageType): Promise<Metadata> {
	const { category } = await getProductsByCategory(params.category);

	return {
		title: `${category.name} - Next.js Masters`,
		description: category.description,
	};
}

export default async function CategoryPage({ params }: CategoryPageType) {
	const { products } = await getProductsByCategory(params.category);

	return <ProductsList products={products} />;
}
