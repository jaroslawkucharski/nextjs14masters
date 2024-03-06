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

const isValidProductSortName = (value: string): value is ProductSortBy => {
	return ["DEFAULT", "NAME", "PRICE", "RATING"].includes(value);
};

const isValidProductSortBy = (value: string): value is ProductSortBy => {
	return ["ASC", "DESC"].includes(value);
};

export const getProductList = async ({
	take = 8,
	skip = 0,
	orderBy = "DEFAULT",
	order = "ASC",
	search,
}: ProductListRequest): Promise<ProductListResponse> => {
	const sort = {
		...(orderBy &&
			isValidProductSortName(orderBy) && {
				orderBy,
			}),
		...(order && isValidProductSortBy(order) && { order }),
	};

	const graphqlResponse = await executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			take,
			skip,
			search,
			...sort,
		},
		next: {
			revalidate: 30,
		},
	});

	const numOfProducts = graphqlResponse.products.meta.total;
	const products = graphqlResponse.products.data;

	return { products, numOfProducts };
};
