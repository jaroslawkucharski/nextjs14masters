import { executeGraphql } from "./graphqlApi";
import {
	CartRemoveItemDocument,
	type CartRemoveItemMutationVariables,
} from "@/gql/graphql";

export const removeProductFromCard = async ({
	id,
	productId,
}: CartRemoveItemMutationVariables) => {
	const graphqlResponse = await executeGraphql(CartRemoveItemDocument, {
		productId,
		id,
	});

	return graphqlResponse;
};
