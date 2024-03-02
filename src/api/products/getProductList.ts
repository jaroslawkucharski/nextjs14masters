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

const validOrderValues: SortDirection[] = ["ASC", "DESC"];
const validOrderByValues: ProductSortBy[] = ["DEFAULT", "NAME", "PRICE"];

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
			orderBy: validOrderByValues.includes(orderBy) ? orderBy : "DEFAULT",
			order: validOrderValues.includes(order) ? order : "ASC",
			search,
		},
		next: {
			revalidate: 30,
		},
	});

	const numOfProducts = graphqlResponse.products.meta.total;
	const products =
		orderBy === ("RATING" as ProductSortBy)
			? graphqlResponse.products.data.sort((a, b) => {
					if (!(a?.rating && b?.rating)) {
						return 0;
					}

					if (order === "ASC") {
						return (a.rating || 0) - (b.rating || 0);
					}

					if (order === "DESC") {
						return (b.rating || 0) - (a.rating || 0);
					}

					return 0;
				})
			: graphqlResponse.products.data;

	return { products, numOfProducts };
};
