import { getCollectionsList } from "@/api/collections/getCollectionList";
import { getProductList } from "@/api/products/getProductList";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { CollectionList } from "@/ui/organisms/CollectionList";
import { ProductsList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const { products } = await getProductList({
		take: 4,
		orderBy: "PRICE",
	});

	const collections = await getCollectionsList({});

	return (
		<>
			<PageHeading>
				<CollectionList collections={collections} />
			</PageHeading>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				<ProductsList products={products} />
			</section>
		</>
	);
}
