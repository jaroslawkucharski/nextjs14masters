import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type Product,
	type ProductListItemFragment,
} from "@/gql/graphql";

export const getProductsById = async (
	id: Product["id"],
): Promise<ProductListItemFragment> => {
	const prographqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id,
	});

	const product = prographqlResponse.product;

	if (!product) {
		notFound();
	}

	return product;
};
