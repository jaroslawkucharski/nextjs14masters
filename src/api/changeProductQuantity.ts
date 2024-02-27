"use server";

import { executeGraphql } from "./graphqlApi";
import {
	CartChangeItemQuantityDocument,
	type CartChangeItemQuantityMutationVariables,
} from "@/gql/graphql";

export const changeProductQuantity = async ({
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
