import { type CartItem } from "@/gql/graphql";
import { CartListItem } from "@/ui/molecules/CartListItem";

export const CartList = ({
	items,
	cartId,
	isCheckout,
}: {
	items: CartItem[];
	cartId: string;
	isCheckout?: boolean;
}) => (
	<table className="table h-fit w-full">
		<tbody>
			{items &&
				items.map((item) => (
					<CartListItem
						key={item.product.id}
						cartId={cartId}
						item={item}
						itemsLength={items.length}
						isCheckout={isCheckout}
					/>
				))}
		</tbody>
	</table>
);
