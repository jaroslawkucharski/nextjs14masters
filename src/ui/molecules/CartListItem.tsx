import Link from "next/link";
import Image from "next/image";
import { ProductCounter } from "./ProductCounter";
import { RemoveProductFromCart } from "./RemoveProductFromCart";
import { type Cart } from "@/gql/graphql";
import { formatMoney } from "@/utils/intl";

export const CartListItem = ({
	item,
	cartId,
	isCheckout,
	itemsLength,
}: {
	item: Cart["items"][0];
	cartId: string;
	isCheckout?: boolean;
	itemsLength: number;
}) => (
	<tr key={item.product.id} className="h-fit border-b">
		<td className="invisible py-4 sm:visible sm:min-w-48 sm:px-4">
			{item.product.images?.[0] && (
				<Link
					prefetch
					href={`/product/${item.product.slug}-${item.product.id}`}
				>
					<Image
						src={item.product.images[0].url}
						alt={item.product.name}
						width={150}
						height={150}
					/>
				</Link>
			)}
		</td>

		<td className="w-full px-4 py-8">
			<p className="mb-10 text-xl">
				<Link
					className="h-fit hover:underline"
					prefetch
					href={`/product/${item.product.slug}-${item.product.id}`}
				>
					{item.product.name}
				</Link>
			</p>

			<div className="pr-8 text-sm text-gray-600">
				{isCheckout ? (
					<p className="text-lg">Quantity: {item.quantity}</p>
				) : (
					<ProductCounter
						id={cartId}
						quantity={item.quantity}
						productId={item.product.id}
					/>
				)}
			</div>
		</td>

		<td className="self-end px-4 py-8">
			{!isCheckout && (
				<RemoveProductFromCart
					cartId={cartId}
					productId={item.product.id}
					itemsLength={itemsLength}
				/>
			)}

			<p>{formatMoney(item.product.price * item.quantity)}</p>
		</td>
	</tr>
);
