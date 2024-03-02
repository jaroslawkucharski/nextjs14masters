import { getProductList } from "@/api/products/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { AMOUNT_OF_PRODUCTS } from "@/constants";
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

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
	const { numOfProducts } = await getProductList({});

	const numOfPages = Math.ceil(numOfProducts / AMOUNT_OF_PRODUCTS);
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

	return pages.map((page) => ({
		params: { page: String(page) },
	}));
}

export default async function ProductsPage({
	params,
	searchParams,
}: ProductsPageType) {
	const skip = Number(params.page) * AMOUNT_OF_PRODUCTS - AMOUNT_OF_PRODUCTS;

	const { products } = await getProductList({
		skip,
		order: searchParams.by,
		orderBy: searchParams.sort,
	});

	return <ProductsList products={products} />;
}
