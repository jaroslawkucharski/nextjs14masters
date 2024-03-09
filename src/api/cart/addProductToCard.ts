import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
import {
	CartAddItemDocument,
	type CartAddItemMutation,
	type CartAddItemMutationVariables,
} from "@/gql/graphql";
import { getCookie } from "@/utils/cookies";

type AddProductToCartRequest = {
	productId: CartAddItemMutationVariables["productId"];
	quantity: CartAddItemMutationVariables["quantity"];
};

export const addProductToCart = async ({
	productId,
	quantity,
}: AddProductToCartRequest): Promise<CartAddItemMutation | null> => {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const addProduct = await executeGraphQl({
		query: CartAddItemDocument,
		variables: {
			id: cartId,
			productId,
			quantity,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	revalidateTag("cart");

	return addProduct;
};
