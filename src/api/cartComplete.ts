import { executeGraphql } from "./graphqlApi";
import {
	CartCompleteDocument,
	type CartCompleteMutation,
	type CartCompleteMutationVariables,
} from "@/gql/graphql";

export const cartComplete = async (
	id: CartCompleteMutationVariables["id"],
): Promise<CartCompleteMutation["cartComplete"]> => {
	const graphqlResponse = await executeGraphql(CartCompleteDocument, {
		id,
	});

	return graphqlResponse.cartComplete;
};
