"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
import {
	CartChangeItemQuantityDocument,
	type CartChangeItemQuantityMutation,
	type CartChangeItemQuantityMutationVariables,
} from "@/gql/graphql";
import { getCookie } from "@/utils/cookies";

type ChangeProductQuantityRequest = {
	productId: CartChangeItemQuantityMutationVariables["productId"];
	quantity: CartChangeItemQuantityMutationVariables["quantity"];
};

export const changeProductQuantity = async ({
	productId,
	quantity,
}: ChangeProductQuantityRequest): Promise<CartChangeItemQuantityMutation | null> => {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const changeQuantity = await executeGraphQl({
		query: CartChangeItemQuantityDocument,
		variables: {
			productId,
			id: cartId,
			quantity,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	revalidateTag("cart");

	return changeQuantity;
};
