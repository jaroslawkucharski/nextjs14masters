import { cookies } from "next/headers";
import { executeGraphQl } from "./graphqlApi";
import {
	CartCreateDocument,
	type CartCreateMutation,
	type CartCreateMutationVariables,
} from "@/gql/graphql";

export const createCart = async ({
	productId,
	quantity,
}: CartCreateMutationVariables): Promise<CartCreateMutation> => {
	const newCart = await executeGraphQl({
		query: CartCreateDocument,
		variables: {
			productId,
			quantity,
		},
		next: {
			tags: ["cart"],
		},
	});

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.cartFindOrCreate.id, {
		httpOnly: true,
		sameSite: "strict",
	});

	return newCart;
};
