import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
import {
	CartCreateDocument,
	type CartCreateMutation,
	type CartCreateMutationVariables,
} from "@/gql/graphql";
import { setCookie } from "@/utils/cookies";

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
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	await setCookie("cartId", newCart.cartFindOrCreate.id);

	revalidateTag("cart");

	return newCart;
};
