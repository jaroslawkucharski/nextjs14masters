import { type Metadata } from "next";
import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { Pagination } from "@/ui/molecules/Pagination";
import { getProducts } from "@/api/products";
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
	const products = await getProducts({ take: "80" });
	const numOfPages = Math.ceil(products.length / Number(AMOUNT_OF_PRODUCTS));
	const numOfPage = params.page ? Number(params.page) : 1;

	if (Number(params.page) < 1 || Number(params.page) > numOfPages) {
		return notFound();
	}

	return (
		<section>
			<h2 className="mb-10 text-center text-lg md:text-left lg:text-left">
				All
			</h2>

			{children}

			<Pagination totalItems={products.length} currentPage={numOfPage} />
		</section>
	);
}
