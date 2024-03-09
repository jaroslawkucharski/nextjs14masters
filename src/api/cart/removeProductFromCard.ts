"use server";

import { executeGraphQl } from "../graphqlApi";
import { getCookie } from "@/utils/cookies";
import {
	CartRemoveItemDocument,
	type CartRemoveItemMutation,
	type CartRemoveItemMutationVariables,
} from "@/gql/graphql";

export const removeProductFromCard = async (
	productId: CartRemoveItemMutationVariables["productId"],
): Promise<CartRemoveItemMutation | null> => {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const removeProduct = await executeGraphQl({
		query: CartRemoveItemDocument,
		variables: {
			productId,
			id: cartId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	return removeProduct;
};
