// TODO - AI search
import { type Metadata } from "next";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { ReviewForm } from "./ReviewForm";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { getProductById } from "@/api/products/getProductById";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getProductList } from "@/api/products/getProductList";
import { createCart } from "@/api/cart/createCart";
import { addProductToCart } from "@/api/cart/addProductToCard";
import { ReviewList } from "@/ui/organisms/ReviewList";
import { type Review } from "@/gql/graphql";
import { getCartById } from "@/api/cart/getCartById";
import { changeProductQuantity } from "@/api/cart/changeProductQuantity";
import { CATEGORY_AMOUNT_OF_PRODUCTS } from "@/constants";

export type ProductPageType = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({
	params,
}: ProductPageType): Promise<Metadata> {
	const productId = params.productId.split("-").pop() as string;

	if (isNaN(Number(productId))) {
		return notFound();
	}

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
	const t = await getTranslations("Product");

	const user = await currentUser();

	const email = user?.emailAddresses[0]?.emailAddress;

	const productId = params.productId.split("-").pop() as string;

	const product = await getProductById(productId);

	if (!product && !productId) {
		return notFound();
	}

	const { products } = await getProductList({
		take: CATEGORY_AMOUNT_OF_PRODUCTS,
		orderBy: "PRICE",
	});

	const getOrCreateCart = async () => {
		"use server";

		const cart = await getCartById();

		if (cart) {
			const itemExist = cart?.items.find(
				(item) => item.product.id === productId,
			);

			if (!itemExist) {
				const addToCart = await addProductToCart({
					productId,
					quantity: 1,
				});

				return addToCart;
			}

			return changeProductQuantity({
				productId,
				quantity: itemExist.quantity + 1,
			});
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
			<section className="mx-auto max-w-md p-12 pt-10 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl lg:pt-10">
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
							<StatusButton data-testid="add-to-cart-button">
								{t("button-add-to-cart")}
							</StatusButton>
						</form>
					</div>
				</article>

				<section
					className="mx-auto max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-7xl"
					data-testid="related-products"
				>
					<h2 className="mb-6 text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
						{t("related-products")}
					</h2>

					<ProductsList products={products} />
				</section>

				<section className="mx-auto max-w-md sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
					<h2 className="text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
						{t("reviews")}
					</h2>

					<div className="mx-auto flex max-w-md flex-col gap-12 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl xl:flex-row">
						<Suspense>
							<ReviewForm
								productId={productId}
								i18n={{
									name: t("name"),
									namePlaceholder: t("name-placeholder"),
									email: t("email"),
									emailPlaceholder: t("email-placeholder"),
									headline: t("headline"),
									headlinePlaceholder: t("headline-placeholder"),
									content: t("content"),
									contentPlaceholder: t("content-placeholder"),
									rating: t("rating"),
									button: t("button"),
								}}
								email={email}
							/>
						</Suspense>

						<ReviewList
							reviews={product.reviews as Review[]}
							productId={productId}
						/>
					</div>
				</section>
			</section>
		</>
	);
}
