import { notFound } from "next/navigation";
import { executeGraphQl } from "../graphqlApi";
import {
	ProductGetByIdDocument,
	type Product,
	type ProductListItemFragment,
} from "@/gql/graphql";

export const getProductById = async (
	id: Product["id"],
): Promise<ProductListItemFragment> => {
	const graphqlResponse = await executeGraphQl({
		query: ProductGetByIdDocument,
		variables: {
			id,
		},
		cache: "no-store",
		next: {
			tags: ["product"],
		},
	});

	const product = graphqlResponse.product;

	if (!product) {
		return notFound();
	}

	return product;
};
