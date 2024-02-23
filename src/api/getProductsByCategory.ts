import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
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
	const prographqlResponse = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{
			slug,
		},
	);

	const products = prographqlResponse.category?.products;
	const category = {
		name: prographqlResponse.category?.name || "",
		description: prographqlResponse.category?.description || "",
	};

	if (!products) {
		return notFound();
	}

	return { products, category };
};
