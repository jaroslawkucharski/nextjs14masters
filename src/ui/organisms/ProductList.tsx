import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductsList = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => (
	<ul
		className="grid cursor-pointer grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		data-testid="products-list"
	>
		{products.map((product) => (
			<ProductListItem key={product.id} product={product} />
		))}
	</ul>
);
