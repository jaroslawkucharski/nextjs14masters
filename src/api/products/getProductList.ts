import { executeGraphQl } from "../graphqlApi";
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
	search?: string;
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
	search,
}: ProductListRequest): Promise<ProductListResponse> => {
	const graphqlResponse = await executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			take,
			skip,
			orderBy,
			order,
			search,
		},
		next: {
			revalidate: 30,
		},
	});

	const numOfProducts = graphqlResponse.products.meta.total;
	const products = graphqlResponse.products.data;

	return { products, numOfProducts };
};
