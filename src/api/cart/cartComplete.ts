import { executeGraphQl } from "../graphqlApi";
import {
	CartCompleteDocument,
	type CartCompleteMutation,
	type CartCompleteMutationVariables,
} from "@/gql/graphql";

export const cartComplete = async (
	id: CartCompleteMutationVariables["id"],
): Promise<CartCompleteMutation["cartComplete"]> => {
	const graphqlResponse = await executeGraphQl({
		query: CartCompleteDocument,
		variables: {
			id,
		},
	});

	return graphqlResponse.cartComplete;
};
