import { type ReactNode } from "react";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { getProductsByCollection } from "@/api/products/getProductsByCollection";

type CollectionsLayoutType = {
	children: ReactNode;
	params: {
		collectionName: string;
	};
};

export default async function CollectionLayout({
	children,
	params,
}: CollectionsLayoutType) {
	const { collection } = await getProductsByCollection(params.collectionName);

	return (
		<>
			<PageHeading
				title={collection?.name}
				description={collection?.description}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}
			</section>
		</>
	);
}
