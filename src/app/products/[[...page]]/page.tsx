import { getProductList } from "@/api/products/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { DEFAULT_AMOUNT_OF_PRODUCTS } from "@/constants";
import { type ProductSortBy, type SortDirection } from "@/gql/graphql";

export type ProductsPageType = {
	params: {
		page: string;
	};
	searchParams: {
		sort: ProductSortBy;
		by: SortDirection;
	};
};

export default async function ProductsPage({
	params,
	searchParams,
}: ProductsPageType) {
	const skip =
		Number(params.page) * DEFAULT_AMOUNT_OF_PRODUCTS -
		DEFAULT_AMOUNT_OF_PRODUCTS;

	const isValidProductSortName = (value: string): value is ProductSortBy => {
		return ["DEFAULT", "NAME", "PRICE", "RATING"].includes(value);
	};

	const isValidProductSortBy = (value: string): value is ProductSortBy => {
		return ["ASC", "DESC"].includes(value);
	};

	const sort = {
		...(searchParams.sort &&
			isValidProductSortName(searchParams.sort) && {
				orderBy: searchParams.sort,
			}),
		...(searchParams.by &&
			isValidProductSortBy(searchParams.by) && { order: searchParams.by }),
	};

	const { products } = await getProductList({
		skip,
		...sort,
	});

	return <ProductsList products={products} />;
}
