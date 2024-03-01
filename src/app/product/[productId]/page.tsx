// TODO - not found page
import { type Metadata } from "next";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { AddProductToCart } from "@/ui/molecules/AddProductToCart";
import { getProductById } from "@/api/product/getProductById";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductList } from "@/api/products/getProductList";
import { createCart } from "@/api/cart/createCart";
import { addProductToCart } from "@/api/cart/addProductToCard";
import { ReviewList } from "@/ui/organisms/ReviewList";
import { type Review } from "@/gql/graphql";

export type ProductPageType = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({
	params,
}: ProductPageType): Promise<Metadata> {
	const productId = params.productId.split("-").pop() as string;

	const { name, description, images } = await getProductById(productId);

	return {
		title: name,
		description,
		openGraph: {
			title: name,
			description,
			images,
		},
	};
}

export default async function ProductPage({ params }: ProductPageType) {
	const productId = params.productId.split("-").pop() as string;
	const product = await getProductById(productId);

	const { products } = await getProductList({
		take: 4,
		orderBy: "PRICE",
	});

	const getOrCreateCart = async () => {
		"use server";

		const cartId = cookies().get("cartId")?.value;

		if (cartId) {
			const add = await addProductToCart({
				id: cartId,
				productId,
				quantity: 1,
			});

			revalidateTag("cart");

			return add;
		} else {
			const newCart = await createCart({ productId, quantity: 1 });

			revalidateTag("cart");

			return newCart;
		}
	};

	const addToCartAction = async () => {
		"use server";

		const cart = await getOrCreateCart();

		return cart;
	};

	return (
		<>
			<section className="mx-auto max-w-md p-12 pt-10 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl lg:pt-28">
				<article className="mb-12 grid w-full grid-cols-1 gap-14 sm:grid sm:grid-cols-2">
					{product.images[0]?.url && (
						<ProductCoverImage
							src={product.images[0]?.url}
							alt={product.name}
						/>
					)}

					<div>
						<ProductDescription product={product} />

						<form action={addToCartAction}>
							<AddProductToCart />
						</form>
					</div>
				</article>

				<section
					className="mx-auto max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-7xl"
					data-testid="related-products"
				>
					<h2 className="mb-6 text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
						Related products
					</h2>

					<ProductsList products={products} />
				</section>

				<ReviewList
					reviews={product.reviews as Review[]}
					productId={productId}
				/>
			</section>
		</>
	);
}
