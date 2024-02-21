import { type CollectionGetListQuery } from "@/gql/graphql";
import { CollectionListItem } from "@/ui/molecules/CollectionListItem";

export const CollectionList = ({
	collections,
}: {
	collections: CollectionGetListQuery["collections"]["data"];
}) => (
	<ul className="grid cursor-pointer grid-cols-1 gap-8 sm:grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
		{collections.map((collection) => (
			<CollectionListItem key={collection.id} collection={collection} />
		))}
	</ul>
);
