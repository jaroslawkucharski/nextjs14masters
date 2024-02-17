import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type Product,
} from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type ProductListResponse = {
	products: ProductItemType[];
	numOfProducts: number;
};

const productResponseItemToProductItemType = (product: Product) => {
	return {
		id: product.id,
		category: product.categories[0]?.name || "",
		name: product.name,
		slug: product.slug,
		price: product.price,
		description: product.description,
		coverImage: product.images[0] && {
			src: product.images[0].url,
			alt: product.name,
		},
	};
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

	const products = prographqlResponse.products.data.map((product) => {
		return {
			id: product.id,
			category: product.categories[0]?.name || "",
			name: product.name,
			slug: product.slug,
			price: product.price,
			description: product.description,
			coverImage: product.images[0] && {
				src: product.images[0].url,
				alt: product.name,
			},
		};
	});
	return { products, numOfProducts };
};

export const getProductsById = async (
	id: ProductItemType["id"],
): Promise<ProductItemType> => {
	const prographqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id,
	});

	console.log("@@@", prographqlResponse);

	return productResponseItemToProductItemType(
		prographqlResponse.product as Product,
	);
};
