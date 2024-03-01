import { executeGraphQl } from "../graphqlApi";
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
	const graphqlResponse = await executeGraphQl({
		query: CollectionGetListDocument,
		variables: {
			take,
			skip,
		},
	});

	const collections = graphqlResponse.collections.data;

	return collections;
};
