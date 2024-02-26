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
	const graphqlResponse = await executeGraphql(
		ProductsGetByCollectionSlugDocument,
		{
			slug,
		},
	);

	const products = graphqlResponse.collection?.products;
	const collection = {
		name: graphqlResponse.collection?.name || "",
		description: graphqlResponse.collection?.description || "",
	};

	if (!products) {
		return notFound();
	}

	return { products, collection };
};
