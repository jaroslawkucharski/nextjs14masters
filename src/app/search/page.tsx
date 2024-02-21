// TODO -pagination
import { type Metadata } from "next";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { getProductList } from "@/api/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "Search",
	description: "Search results.",
};

export type SearchPageType = {
	searchParams: {
		query: string;
	};
};

export default async function SearchPage({ searchParams }: SearchPageType) {
	const { products } = await getProductList({
		search: searchParams.query,
	});

	return (
		<>
			<PageHeading
				title={`Search results for '${searchParams.query}'`}
				description={`Found ${products.length} products.`}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				<ProductsList products={products} />
			</section>
		</>
	);
}
