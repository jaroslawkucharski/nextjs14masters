import { executeGraphQl } from "../graphqlApi";
import { getCookie } from "@/utils/cookies";
import { CartGetByIdDocument, type CartGetByIdQuery } from "@/gql/graphql";

export const getCartById = async (): Promise<CartGetByIdQuery["cart"]> => {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const graphqlResponse = await executeGraphQl({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	const cart = graphqlResponse?.cart;

	return cart;
};
