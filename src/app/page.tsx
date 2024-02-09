import { ProductList } from "@/ui/organisms/ProductList";

const products = [
	{
		id: "1",
		category: "Shoes",
		name: "Very green shoes",
		price: 2137,
		coverImage: { src: "/products/product_1.jpg", alt: "Very green shoes" },
	},
	{
		id: "2",
		category: "Clothes",
		name: "Black T-shirt",
		price: 2137,
		coverImage: { src: "/products/product_2.jpg", alt: "Black T-shirt" },
	},
	{
		id: "3",
		category: "Accessories",
		name: "White cap",
		price: 2137,
		coverImage: { src: "/products/product_3.jpg", alt: "White cap" },
	},
	{
		id: "4",
		category: "Accessories",
		name: "Mug with trees",
		price: 2137,
		coverImage: { src: "/products/product_4.jpg", alt: "Mug with trees" },
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
