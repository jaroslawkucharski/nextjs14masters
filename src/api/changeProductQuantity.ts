import { executeGraphql } from "./graphqlApi";
import {
	CartChangeItemQuantityDocument,
	type CartChangeItemQuantityMutationVariables,
} from "@/gql/graphql";

export const ChangeProductQuantity = async ({
	id,
	productId,
	quantity,
}: CartChangeItemQuantityMutationVariables) => {
	const graphqlResponse = await executeGraphql(CartChangeItemQuantityDocument, {
		productId,
		id,
		quantity,
	});

	return graphqlResponse;
};
