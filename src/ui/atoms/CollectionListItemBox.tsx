import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { type CollectionGetListQuery } from "@/gql/graphql";

type CollectionListItemBoxProps = {
	collection: CollectionGetListQuery["collections"]["data"][0];
};

export const CollectionListItemBox = async ({
	collection: { slug },
}: CollectionListItemBoxProps) => {
	const t = await getTranslations();

	return (
		<div className="p-4">
			<Image
				className="h-full w-full object-cover object-top"
				src={`/collections/${slug}.avif`}
				alt={t(slug)}
				width={400}
				height={400}
			/>

			<h3 className="mt-4 truncate text-sm font-semibold text-gray-950">
				{t(`collection-${slug}`).toLocaleUpperCase()}
			</h3>
		</div>
	);
};
