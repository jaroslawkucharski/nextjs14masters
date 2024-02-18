import { getProductList } from "@/api/products";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { ProductsList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const { products } = await getProductList({ take: 4 });

	return (
		<>
			<PageHeading>Home</PageHeading>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				<ProductsList products={products} />

				<p className="mt-10">
					Pellentesque malesuada, augue at congue aliquam, felis sem dictum
					elit, ac luctus erat justo eu libero. Aliquam rhoncus est nec tempus
					accumsan. Nullam maximus dictum sodales. Nunc magna dui, sodales sed
					libero ornare, porttitor porta neque. Duis ligula erat, gravida a
					pretium ut, faucibus nec turpis. Pellentesque suscipit nisi massa, sed
					facilisis neque pulvinar ac. Aenean placerat libero eleifend nisi
					volutpat, ac posuere massa finibus. Proin et odio tempus enim
					condimentum venenatis ut in sapien. Aliquam rhoncus eget ex sed
					sodales. Sed ornare, felis id efficitur bibendum, urna quam accumsan
					felis, ut gravida metus purus ac sem. Nam suscipit sapien vel nisi
					elementum, vel accumsan velit consequat. Mauris fringilla, turpis
					blandit rutrum iaculis, mi dui consequat massa, ut sollicitudin eros
					justo quis est. Donec a bibendum lectus.
				</p>
			</section>
		</>
	);
}
