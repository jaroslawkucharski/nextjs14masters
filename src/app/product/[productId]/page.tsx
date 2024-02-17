import { type Metadata } from "next";
import { getProductsById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";

export type ProductPageType = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({
	params,
}: ProductPageType): Promise<Metadata> {
	const { name, description, coverImage } = await getProductsById(
		params.productId,
	);

	return {
		title: `${name} - Next.js Masters`,
		description,
		openGraph: {
			title: name,
			description,
			images: coverImage?.src && [
				{
					url: coverImage?.src,
					alt: name,
				},
			],
		},
	};
}

export default async function ProductPage({ params }: ProductPageType) {
	const product = await getProductsById(params.productId);

	return (
		<article className="grid w-full grid-cols-1 gap-14 sm:grid sm:grid-cols-2">
			{product.coverImage && <ProductCoverImage {...product.coverImage} />}

			<ProductDescription product={product} />
		</article>
	);
}
