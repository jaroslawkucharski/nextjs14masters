import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type Product,
	type ProductListItemFragment,
} from "@/gql/graphql";

export const getProductById = async (
	id: Product["id"],
): Promise<ProductListItemFragment> => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id,
	});

	const product = graphqlResponse.product;

	if (!product) {
		return notFound();
	}

	return product;
};
