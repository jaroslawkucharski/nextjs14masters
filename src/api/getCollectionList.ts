import { executeGraphql } from "./graphqlApi";
import {
	type CollectionGetListQuery,
	CollectionGetListDocument,
	type CollectionGetListQueryVariables,
} from "@/gql/graphql";

export const getCollectionsList = async ({
	take,
	skip,
}: CollectionGetListQueryVariables): Promise<
	CollectionGetListQuery["collections"]["data"]
> => {
	const graphqlResponse = await executeGraphql(CollectionGetListDocument, {
		take,
		skip,
	});

	const collections = graphqlResponse.collections.data;

	return collections;
};
