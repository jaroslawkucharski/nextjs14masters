import { getProductList } from "@/api/products/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { type ProductSortBy, type SortDirection } from "@/gql/graphql";
import { getSkip } from "@/helpers";

export type ProductsPageType = {
	params: {
		page: string;
	};
	searchParams: {
		order: ProductSortBy;
		dir: SortDirection;
	};
};

export default async function ProductsPage({
	params,
	searchParams,
}: ProductsPageType) {
	const skip = getSkip(params.page);

	const { products } = await getProductList({
		skip,
		order: searchParams.dir,
		orderBy: searchParams.order,
	});

	return <ProductsList products={products} />;
}
