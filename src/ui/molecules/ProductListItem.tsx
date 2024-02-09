import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/ui/types";

export const ProductListItem = ({ product }: { product: ProductItemType }) => (
	<li>
		<article>
			<ProductListItemCoverImage {...product.coverImage} />

			<ProductListItemDescription product={product} />
		</article>
	</li>
);
