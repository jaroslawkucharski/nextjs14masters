import Link from "next/link";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductListItem = ({
	product,
}: {
	product: ProductListItemFragment;
}) => (
	<li key={product.id}>
		<Link prefetch href={`/product/${product.slug}-${product.id}`}>
			<article className="bg-white transition-transform hover:scale-105">
				{product.images[0]?.url && (
					<ProductListItemCoverImage
						src={product.images[0]?.url}
						alt={product.name}
					/>
				)}

				<ProductListItemDescription product={product} />
			</article>
		</Link>
	</li>
);
