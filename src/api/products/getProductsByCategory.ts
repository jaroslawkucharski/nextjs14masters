import { notFound } from "next/navigation";
import { executeGraphQl } from "../graphqlApi";
import {
	ProductsGetByCategorySlugDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";

type ProductCategoryResponse = {
	products: ProductListItemFragment[];
	category: {
		name: string;
		description: string;
	};
};

export const getProductsByCategory = async (
	slug: string,
): Promise<ProductCategoryResponse> => {
	const graphqlResponse = await executeGraphQl({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug,
		},
	});

	const products = graphqlResponse.category?.products;
	const category = {
		name: graphqlResponse.category?.name || "",
		description: graphqlResponse.category?.description || "",
	};

	if (!products) {
		return notFound();
	}

	return { products, category };
};
