import { executeGraphQl } from "../graphqlApi";
import { getCookie, removeCookie } from "@/utils/cookies";
import {
	CartCompleteDocument,
	type CartCompleteMutation,
	type CartCompleteMutationVariables,
} from "@/gql/graphql";

export const cartComplete = async (
	email: CartCompleteMutationVariables["email"],
): Promise<CartCompleteMutation["cartComplete"] | null> => {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const graphqlResponse = await executeGraphQl({
		query: CartCompleteDocument,
		variables: {
			id: cartId,
			email,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	await removeCookie("cartId");

	return graphqlResponse.cartComplete;
};
