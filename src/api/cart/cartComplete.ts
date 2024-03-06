import { executeGraphQl } from "../graphqlApi";
import {
	CartCompleteDocument,
	type CartCompleteMutation,
	type CartCompleteMutationVariables,
} from "@/gql/graphql";

export const cartComplete = async (
	id: CartCompleteMutationVariables["id"],
	email: CartCompleteMutationVariables["email"],
): Promise<CartCompleteMutation["cartComplete"]> => {
	const graphqlResponse = await executeGraphQl({
		query: CartCompleteDocument,
		variables: {
			id,
			email,
		},
	});

	return graphqlResponse.cartComplete;
};
