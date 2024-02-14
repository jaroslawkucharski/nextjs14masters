import { type Metadata } from "next";
import { getProductsById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";

export type ParamsType = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({
	params,
}: ParamsType): Promise<Metadata> {
	const {
		name,
		description,
		coverImage: { src },
	} = await getProductsById(params.productId);

	return {
		title: `${name} - Next.js Masters`,
		description,
		openGraph: {
			title: name,
			description,
			images: [
				{
					url: src,
					alt: name,
				},
			],
		},
	};
}

export default async function ProductPage({ params }: ParamsType) {
	const product = await getProductsById(params.productId);

	return (
		<article className="grid w-full cursor-pointer grid-cols-1 gap-14 sm:grid sm:grid-cols-2">
			<ProductCoverImage {...product.coverImage} />

			<ProductDescription product={product} />
		</article>
	);
}
