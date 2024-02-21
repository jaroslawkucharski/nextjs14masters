import { executeGraphql } from "./graphqlApi";
import {
	ProductsGetListDocument,
	type ProductListItemFragment,
	type ProductSortBy,
	type SortDirection,
} from "@/gql/graphql";

type ProductListRequest = {
	take?: number;
	skip?: number;
	orderBy?: ProductSortBy;
	order?: SortDirection;
};

type ProductListResponse = {
	products: ProductListItemFragment[];
	numOfProducts: number;
};

export const getProductList = async ({
	take = 8,
	skip = 0,
	orderBy = "DEFAULT",
	order = "ASC",
}: ProductListRequest): Promise<ProductListResponse> => {
	const prographqlResponse = await executeGraphql(ProductsGetListDocument, {
		take,
		skip,
		orderBy,
		order,
	});

	const numOfProducts = prographqlResponse.products.meta.total;
	const products = prographqlResponse.products.data;

	return { products, numOfProducts };
};
