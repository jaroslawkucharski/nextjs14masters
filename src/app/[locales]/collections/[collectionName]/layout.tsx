import { type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { PageHeading } from "@/ui/molecules/PageHeading";
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
	const t = await getTranslations("Collection");

	const { collection } = await getProductsByCollection(params.collectionName);

	return (
		<>
			<PageHeading
				title={t(collection?.slug)}
				description={t(`${collection?.slug}-description`)}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}
			</section>
		</>
	);
}
