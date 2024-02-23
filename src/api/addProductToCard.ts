import { executeGraphql } from "./graphqlApi";
import {
	CartAddItemDocument,
	type CartAddItemMutationVariables,
} from "@/gql/graphql";

export const addProductToCart = async ({
	id,
	productId,
	quantity,
}: CartAddItemMutationVariables) => {
	const graphqlResponse = await executeGraphql(CartAddItemDocument, {
		id,
		productId,
		quantity,
	});

	return graphqlResponse;
};
