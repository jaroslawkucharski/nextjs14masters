import { type Metadata } from "next";
import { getProductsById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { name, description, coverImage } = await getProductsById(
		params.productId,
	);

	return {
		title: name,
		description,
		openGraph: {
			title: name,
			description,
			images: [coverImage.src],
		},
	};
}

export async function generateStaticParams({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductsById(params.productId);

	return product;
}

type ProductPageType = {
	params: {
		productId: string;
	};
};

export default async function ProductPage({ params }: ProductPageType) {
	const product = await getProductsById(params.productId);

	return (
		<article className="grid w-full cursor-pointer grid-cols-1 gap-14 sm:grid sm:grid-cols-2">
			<ProductCoverImage {...product.coverImage} />

			<ProductDescription product={product} />
		</article>
	);
}
