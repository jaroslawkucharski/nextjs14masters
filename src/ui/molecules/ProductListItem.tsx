import Link from "next/link";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/ui/types";

export const ProductListItem = ({ product }: { product: ProductItemType }) => (
	<li key={product.id}>
		<Link prefetch href={`/product/${product.id}`}>
			<article className="bg-white transition-transform hover:scale-105">
				{product.coverImage && (
					<ProductListItemCoverImage {...product.coverImage} />
				)}

				<ProductListItemDescription product={product} />
			</article>
		</Link>
	</li>
);
