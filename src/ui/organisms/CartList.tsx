import { type CartItem } from "@/gql/graphql";
import { CartListItem } from "@/ui/molecules/CartListItem";

export const CartList = ({
	items,
	cartId,
}: {
	items: CartItem[];
	cartId: string;
}) => (
	<table className="table h-fit w-full">
		<thead>
			<tr>
				<th className="sr-only px-4 py-2">Image</th>
				<th className="sr-only px-4 py-2">Name</th>
				<th className="sr-only px-4 py-2">Price</th>
			</tr>
		</thead>

		<tbody>
			{items &&
				items.map((item) => (
					<CartListItem key={item.product.id} cartId={cartId} item={item} />
				))}
		</tbody>
	</table>
);
