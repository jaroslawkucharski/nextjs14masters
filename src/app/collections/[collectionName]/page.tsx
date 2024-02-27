import type { Metadata } from "next";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductsByCollection } from "@/api/getProductsByCollection";
// import { getCollectionsList } from "@/api/getCollectionList";

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
		title: collection.name.toLocaleUpperCase(),
		description: collection.description,
	};
}

// TODO - generateStaticParams
// export async function generateStaticParams() {
// 	const collections = await getCollectionsList({});

// 	return collections.map((collection) => ({
// 		params: {
// 			collectionName: collection.name,
// 		},
// 	}));
// }

export default async function CollectionPage({ params }: CollectionPageType) {
	const { products } = await getProductsByCollection(params.collectionName);

	return <ProductsList products={products} />;
}
