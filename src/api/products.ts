import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type Product,
	ProductsGetByCategorySlugDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";

type ProductListResponse = {
	products: ProductListItemFragment[];
	numOfProducts: number;
};

export const getProductList = async ({
	take = 8,
	skip = 0,
}): Promise<ProductListResponse> => {
	const prographqlResponse = await executeGraphql(ProductsGetListDocument, {
		take,
		skip,
	});

	const numOfProducts = prographqlResponse.products.meta.total;
	const products = prographqlResponse.products.data;

	return { products, numOfProducts };
};

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
		notFound();
	}

	return { products, category };
};
