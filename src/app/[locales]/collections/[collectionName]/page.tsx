import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCollection } from "@/api/products/getProductsByCollection";

export type CollectionPageType = {
	params: {
		collectionName: string;
	};
};

export async function generateMetadata({
	params,
}: CollectionPageType): Promise<Metadata> {
	const t = await getTranslations();

	const { collection } = await getProductsByCollection(params.collectionName);

	return {
		title: t(`collection-${collection.slug}`).toLocaleUpperCase(),
		description: t(`collection-${collection?.slug}-description`),
	};
}

export default async function CollectionPage({ params }: CollectionPageType) {
	const { products } = await getProductsByCollection(params.collectionName);

	return <ProductsList products={products} />;
}
