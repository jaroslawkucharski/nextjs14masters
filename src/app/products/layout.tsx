import { type Metadata } from "next";
import { type ReactNode } from "react";
import { Pagination } from "@/ui/atoms/Paginaation";
import { getProducts } from "@/api/products";

export const metadata: Metadata = {
	title: "All - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsLayout({
	children,
}: {
	children: ReactNode;
}) {
	const products = await getProducts({ take: "80" });

	return (
		<section>
			<h2 className="mb-10 text-center text-2xl md:text-left lg:text-left">
				ALL
			</h2>

			{children}

			<Pagination length={products.length} />
		</section>
	);
}
