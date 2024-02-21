import Link from "next/link";
import { CollectionListItemBox } from "@/ui/atoms/CollectionListItemBox";
import { type CollectionGetListQuery } from "@/gql/graphql";

export const CollectionListItem = ({
	collection,
}: {
	collection: CollectionGetListQuery["collections"]["data"][0];
}) => (
	<li key={collection.id} className="self-stretch">
		<Link prefetch href={`/collections/${collection.slug}`}>
			<article className="h-full w-full bg-white transition-transform hover:scale-105">
				<CollectionListItemBox collection={collection} />
			</article>
		</Link>
	</li>
);
