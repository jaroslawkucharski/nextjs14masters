"use server";

import { executeGraphQl } from "../graphqlApi";
import {
	CartRemoveItemDocument,
	type CartRemoveItemMutationVariables,
} from "@/gql/graphql";

export const removeProductFromCard = async ({
	id,
	productId,
}: CartRemoveItemMutationVariables) => {
	const removeProduct = await executeGraphQl({
		query: CartRemoveItemDocument,
		variables: {
			productId,
			id,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	return removeProduct;
};
