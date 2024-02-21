import { getProductList } from "@/api/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

export type ProductsPageType = {
	params: {
		page: string;
	};
};

export async function generateStaticParams() {
	const { numOfProducts } = await getProductList({});

	const numOfPages = Math.ceil(numOfProducts / AMOUNT_OF_PRODUCTS);
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

	return pages.map((page) => ({
		params: { page: String(page) },
	}));
}

export default async function ProductsPage({ params }: ProductsPageType) {
	const skip = Number(params.page) * AMOUNT_OF_PRODUCTS - AMOUNT_OF_PRODUCTS;

	const { products } = await getProductList({ skip });

	return <ProductsList products={products} />;
}
