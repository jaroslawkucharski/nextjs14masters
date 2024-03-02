import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
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
		cache: "no-store",
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

	revalidateTag("cart");

	return newCart;
};
