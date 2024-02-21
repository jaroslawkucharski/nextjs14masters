import { type CollectionGetListQuery } from "@/gql/graphql";

type CollectionListItemBoxProps = {
	collection: CollectionGetListQuery["collections"]["data"][0];
};

export const CollectionListItemBox = ({
	collection: { name, description },
}: CollectionListItemBoxProps) => (
	<div className="p-4">
		<h3 className="truncate text-sm font-semibold text-gray-950">
			{name.toLocaleUpperCase()}
		</h3>

		<p className="mt-6 text-sm text-gray-500">
			<span className="sr-only">Category:</span>

			{description}
		</p>
	</div>
);
