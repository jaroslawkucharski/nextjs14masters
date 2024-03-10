import { type Metadata } from "next";

import { SearchX } from "lucide-react";
import Link from "next/link";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { getProductList } from "@/api/products/getProductList";
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
	const data = searchParams.query
		? await getProductList({
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
				{products?.length ? (
					<ProductsList products={products} />
				) : (
					<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
						<SearchX className="h-28 w-28 text-slate-500" />

						<p className="my-2 text-2xl">
							We could not find what you were looking for
						</p>

						<Link
							href={{ pathname: "/" }}
							className="text-sm uppercase hover:underline"
						>
							Back to shopping
						</Link>
					</div>
				)}
			</section>
		</>
	);
}
