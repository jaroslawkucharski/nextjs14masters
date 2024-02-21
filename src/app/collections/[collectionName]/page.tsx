import type { Metadata } from "next";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCollection } from "@/api/getProductsByCollection";

export type CollectionPageType = {
	params: {
		collectionName: string;
	};
};

export async function generateMetadata({
	params,
}: CollectionPageType): Promise<Metadata> {
	const { collection } = await getProductsByCollection(params.collectionName);

	return {
		title: `${collection.name} - Next.js Masters`,
		description: collection.description,
	};
}

export default async function CollectionPage({ params }: CollectionPageType) {
	const { products } = await getProductsByCollection(params.collectionName);

	return <ProductsList products={products} />;
}