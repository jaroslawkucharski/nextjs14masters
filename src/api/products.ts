import { executeGraphql } from "./graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type ProductListResponse = {
	products: ProductItemType[];
	numOfProducts: number;
};

type ProductResponseItem = {
	id: string;
	category: string;
	title: string;
	description: string;
	longDescription: string;
	price: number;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

const productResponseItemToProductItemType = (product: ProductResponseItem) => {
	return {
		id: product.id,
		category: product.category,
		name: product.title,
		price: product.price,
		description: product.description,
		longDescription: product.longDescription,
		coverImage: {
			src: product.image,
			alt: product.title,
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
			category: "",
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

// export const getProductsById = async ({
// 	id,
// }: {
// 	id: ProductResponseItem["id"];
// }) => {
// 	const prographqlResponse = await executeGraphql(ProductGetByIdDocument, {
// 		id,
// 	});

// 	return productResponseItemToProductItemType(prographqlResponse as Product);
// };

export const getProductsById = async (id: ProductResponseItem["id"]) => {
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const product = (await response.json()) as ProductResponseItem;

	return productResponseItemToProductItemType(product);
};
