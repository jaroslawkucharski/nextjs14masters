import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
import {
	CartAddItemDocument,
	type CartAddItemMutationVariables,
} from "@/gql/graphql";

export const addProductToCart = async ({
	id,
	productId,
	quantity,
}: CartAddItemMutationVariables) => {
	const addProduct = await executeGraphQl({
		query: CartAddItemDocument,
		variables: {
			id,
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
