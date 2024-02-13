import { type Metadata } from "next";
import { getProducts, getProductsById } from "@/api/products";
import { ProductCounter } from "@/ui/atoms/ProductCounter";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductDescription } from "@/ui/atoms/ProductDescription";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const { name, description } = await getProductsById(params.productId);

	return {
		title: `${name} - Next.js Masters`,
		description,
	};
};

export async function generateStaticParams() {
	const products = await getProducts();

	return products.map((product) => ({ productId: product.id }));
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

			<div>
				<ProductDescription product={product} />

				<ProductCounter>
					test: server component in client component
				</ProductCounter>
			</div>
		</article>
	);
}
