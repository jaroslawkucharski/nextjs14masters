import { type Metadata } from "next";
import { getProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "Products - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<>
			<h2 className="mb-10 text-center text-2xl md:text-left lg:text-left">
				PRODUCTS
			</h2>

			<ProductList products={products} />
		</>
	);
}
