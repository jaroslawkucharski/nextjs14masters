import { getProductsById } from "@/api/products";
import { ProductCounter } from "@/ui/atoms/ProductCounter";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductPageType = {
	params: {
		productId: string;
		pathname: string[];
	};
};

export default async function ProductPage({ params }: ProductPageType) {
	const product = await getProductsById(params.productId);

	return (
		<>
			<ProductListItemCoverImage {...product.coverImage} />

			<ProductListItemDescription product={product} />

			<ProductCounter>dsdf</ProductCounter>
		</>
	);
}
