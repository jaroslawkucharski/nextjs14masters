import { type Metadata } from "next";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { ReviewForm } from "./ReviewForm";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { getProductById } from "@/api/products/getProductById";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { createCart } from "@/api/cart/createCart";
import { addProductToCart } from "@/api/cart/addProductToCard";
import { ReviewList } from "@/ui/organisms/ReviewList";
import { type Review } from "@/gql/graphql";
import { getCartById } from "@/api/cart/getCartById";
import { changeProductQuantity } from "@/api/cart/changeProductQuantity";
import { Rating } from "@/ui/atoms/Rating";
import { RecommendProducts } from "@/ui/molecules/RecommendProducts";
import { Loader } from "@/ui/atoms/Loader";

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
	const t = await getTranslations();
	const lang = await getLocale();

	const user = await currentUser();

	const email = user?.emailAddresses[0]?.emailAddress ?? "";
	const name = user?.firstName ?? "";

	const productId = params.productId.split("-").pop() as string;

	const product = await getProductById(productId);

	if (!product && !productId) {
		return notFound();
	}

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
								{t("word-add-to-cart")}
							</StatusButton>
						</form>
					</div>
				</article>

				<hr />

				<section
					className="mx-auto max-w-md py-6 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl"
					data-testid="related-products"
				>
					<h2 className="mb-6 text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
						{t("word-recommend-products")}
					</h2>

					<Suspense fallback={<Loader />}>
						<RecommendProducts productId={productId} lang={lang} />
					</Suspense>
				</section>

				<hr />

				<section className="mx-auto max-w-md sm:max-w-2xl sm:py-6 md:max-w-4xl lg:max-w-7xl">
					<h2 className="flex items-center gap-2 text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
						{t("word-reviews")}
					</h2>

					<div className="mt-4 flex flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center">
						<Rating rating={product.rating} />

						<p className="flex items-center justify-center text-sm">
							{t("word-reviews-quantity", { quantity: product.reviews.length })}
						</p>
					</div>

					<div className="mx-auto flex max-w-md flex-col gap-12 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl xl:flex-row">
						<Suspense>
							<ReviewForm productId={productId} email={email} name={name} />
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
