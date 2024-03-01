// TODO -pagination
import { type Metadata } from "next";
import { Suspense } from "react";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { getProductList } from "@/api/products/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { Loader } from "@/ui/atoms/Loader";

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
	const data = searchParams.query
		? await getProductList({
				take: 4,
				search: searchParams.query,
			})
		: null;

	const products = data?.products;

	return (
		<>
			<PageHeading
				title={`Search results for "${searchParams.query ?? ""}"`}
				description={`Found ${products?.length ?? 0} products.`}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{products && (
					<Suspense fallback={<Loader />}>
						<ProductsList products={products} />
					</Suspense>
				)}
			</section>
		</>
	);
}
