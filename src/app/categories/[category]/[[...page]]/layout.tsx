import { type ReactNode } from "react";
import { getProductsByCategory } from "@/api/products";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		category: string;
	};
};

export default async function CategoryLayout({
	children,
	params,
}: ProductsLayoutType) {
	const { category } = await getProductsByCategory(params.category);

	return (
		<section>
			<h2 className="mb-10 text-center text-lg md:text-left lg:text-left">
				{category}
			</h2>

			{children}
		</section>
	);
}
