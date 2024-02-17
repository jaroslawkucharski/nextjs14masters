import { type Metadata } from "next";
import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { Pagination } from "@/ui/molecules/Pagination";
import { getProductList } from "@/api/products";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		page: string;
	};
};

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsLayout({
	children,
	params,
}: ProductsLayoutType) {
	const { numOfProducts } = await getProductList({});
	const numOfPages = Math.ceil(numOfProducts / AMOUNT_OF_PRODUCTS);

	if (
		Number(params.page) < 1 ||
		Number(params.page) > numOfPages ||
		isNaN(Number(params.page))
	) {
		return notFound();
	}

	return (
		<section>
			<h2 className="mb-10 text-center text-lg md:text-left lg:text-left">
				All
			</h2>

			{children}

			<Pagination
				totalItems={numOfProducts}
				currentPage={Number(params.page)}
			/>
		</section>
	);
}
