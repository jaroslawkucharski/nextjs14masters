import Image from "next/image";
import { type CollectionGetListQuery } from "@/gql/graphql";

type CollectionListItemBoxProps = {
	collection: CollectionGetListQuery["collections"]["data"][0];
};

export const CollectionListItemBox = ({
	collection: { name, slug },
}: CollectionListItemBoxProps) => (
	<div className="p-4">
		<Image
			className="h-full w-full object-cover object-top"
			src={`/collections/${slug}.avif`}
			alt={name}
			width={400}
			height={400}
		/>

		<h3 className="mt-4 truncate text-sm font-semibold text-gray-950">
			{name.toLocaleUpperCase()}
		</h3>
	</div>
);
