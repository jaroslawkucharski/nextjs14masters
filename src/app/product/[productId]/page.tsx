import { type Metadata } from "next";
import { getProductsById } from "@/api/getProductsById";
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
	const productId = params.productId.split("-").pop() as string;

	const { name, description, images } = await getProductsById(productId);

	return {
		title: `${name} - Next.js Masters`,
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
	const product = await getProductsById(productId);

	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<article className="grid w-full grid-cols-1 gap-14 sm:grid sm:grid-cols-2">
				{product.images[0]?.url && (
					<ProductCoverImage src={product.images[0]?.url} alt={product.name} />
				)}

				<ProductDescription product={product} />
			</article>
		</section>
	);
}
