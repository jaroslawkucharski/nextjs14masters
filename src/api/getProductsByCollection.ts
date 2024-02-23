import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	type ProductListItemFragment,
	ProductsGetByCollectionSlugDocument,
} from "@/gql/graphql";

type ProductCollectionResponse = {
	products: ProductListItemFragment[];
	collection: {
		name: string;
		description: string;
	};
};

export const getProductsByCollection = async (
	slug: string,
): Promise<ProductCollectionResponse> => {
	const prographqlResponse = await executeGraphql(
		ProductsGetByCollectionSlugDocument,
		{
			slug,
		},
	);

	const products = prographqlResponse.collection?.products;
	const collection = {
		name: prographqlResponse.collection?.name || "",
		description: prographqlResponse.collection?.description || "",
	};

	if (!products) {
		return notFound();
	}

	return { products, collection };
};
