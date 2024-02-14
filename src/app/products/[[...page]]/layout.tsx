import { type Metadata } from "next";
import { type ReactNode } from "react";
import { Pagination } from "@/ui/atoms/Pagination";
import { getProducts } from "@/api/products";

type ProductsLayoutType = {
	children: ReactNode;
};

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsLayout({ children }: ProductsLayoutType) {
	const products = await getProducts({ take: "80" });

	return (
		<section>
			<h2 className="mb-10 text-center text-lg md:text-left lg:text-left">
				All
			</h2>

			{children}

			<Pagination length={products.length} />
		</section>
	);
}
