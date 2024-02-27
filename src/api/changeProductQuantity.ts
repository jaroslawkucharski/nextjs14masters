"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQl } from "./graphqlApi";
import {
	CartChangeItemQuantityDocument,
	type CartChangeItemQuantityMutationVariables,
} from "@/gql/graphql";

export const changeProductQuantity = async ({
	id,
	productId,
	quantity,
}: CartChangeItemQuantityMutationVariables) => {
	const graphqlResponse = await executeGraphQl({
		query: CartChangeItemQuantityDocument,
		variables: {
			productId,
			id,
			quantity,
		},
		next: {
			tags: ["cart"],
		},
	});

	revalidateTag("cart");

	return graphqlResponse;
};
