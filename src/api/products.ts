import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type Product,
	ProductsGetByCategorySlugDocument,
} from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type ProductListResponse = {
	products: ProductItemType[];
	numOfProducts: number;
};

type ProductCategoryResponse = {
	products: ProductItemType[];
	category: string;
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

	if (!prographqlResponse.product) {
		notFound();
	}

	return productResponseItemToProductItemType(
		prographqlResponse.product as Product,
	);
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

	const category = prographqlResponse.category?.name || "";

	const products = prographqlResponse.category?.products.map((product) => {
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

	if (!products) {
		notFound();
	}

	return { products, category };
};
