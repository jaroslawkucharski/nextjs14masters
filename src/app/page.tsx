import { getProductList } from "@/api/products";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { ProductsList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const { products } = await getProductList({ take: 4 });

	return (
		<>
			<PageHeading>COLLECTIONS LIST</PageHeading>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				<ProductsList products={products} />
			</section>
		</>
	);
}
