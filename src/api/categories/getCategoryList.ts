import { executeGraphQl } from "../graphqlApi";
import {
	type CategoryGetListQuery,
	CategoryGetListDocument,
	type CategoryGetListQueryVariables,
} from "@/gql/graphql";

export const getCategoryList = async ({
	take,
	skip,
}: CategoryGetListQueryVariables): Promise<
	CategoryGetListQuery["categories"]["data"]
> => {
	const graphqlResponse = await executeGraphQl({
		query: CategoryGetListDocument,
		variables: {
			take,
			skip,
		},
	});

	const categories = graphqlResponse.categories.data;

	return categories;
};
