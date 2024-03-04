import { type Metadata } from "next";
import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { Pagination } from "@/ui/molecules/Pagination";
import { getProductList } from "@/api/products/getProductList";
import { DEFAULT_AMOUNT_OF_PRODUCTS } from "@/constants";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { getNumOfPages } from "@/helpers";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		page: string;
	};
};

export const metadata: Metadata = {
	title: "All products",
	description: "Products page.",
};

export default async function ProductsLayout({
	children,
	params,
}: ProductsLayoutType) {
	const { numOfProducts } = await getProductList({});
	const numOfPages = getNumOfPages(numOfProducts, DEFAULT_AMOUNT_OF_PRODUCTS);

	if (
		Number(params.page) < 1 ||
		Number(params.page) > numOfPages ||
		isNaN(Number(params.page))
	) {
		return notFound();
	}

	return (
		<>
			<PageHeading title="All products" sort />

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}

				<Pagination
					totalItems={numOfProducts}
					currentPage={Number(params.page)}
					path="products"
				/>
			</section>
		</>
	);
}
