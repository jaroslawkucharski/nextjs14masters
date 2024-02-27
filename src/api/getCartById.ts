import { executeGraphQl } from "./graphqlApi";
import {
	CartGetByIdDocument,
	type Cart,
	type CartGetByIdQuery,
} from "@/gql/graphql";

export const getCartById = async (
	id: Cart["id"],
): Promise<CartGetByIdQuery["cart"]> => {
	const graphqlResponse = await executeGraphQl({
		query: CartGetByIdDocument,
		variables: {
			id,
		},
		next: {
			tags: ["cart"],
		},
	});

	const cart = graphqlResponse?.cart;

	return cart;
};
