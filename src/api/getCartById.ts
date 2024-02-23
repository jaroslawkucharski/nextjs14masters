import { executeGraphql } from "./graphqlApi";
import {
	CartGetByIdDocument,
	type Cart,
	type CartGetByIdQuery,
} from "@/gql/graphql";

export const getCartById = async (
	id: Cart["id"],
): Promise<CartGetByIdQuery["cart"]> => {
	const graphqlResponse = await executeGraphql(CartGetByIdDocument, {
		id,
	});

	const cart = graphqlResponse?.cart;

	return cart;
};
