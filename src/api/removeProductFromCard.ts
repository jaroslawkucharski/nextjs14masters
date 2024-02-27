import { executeGraphQl } from "./graphqlApi";
import {
	CartRemoveItemDocument,
	type CartRemoveItemMutationVariables,
} from "@/gql/graphql";

export const removeProductFromCard = async ({
	id,
	productId,
}: CartRemoveItemMutationVariables) => {
	const graphqlResponse = await executeGraphQl({
		query: CartRemoveItemDocument,
		variables: {
			productId,
			id,
		},
		next: {
			tags: ["cart"],
		},
	});

	return graphqlResponse;
};
