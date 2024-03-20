import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductCounter } from "./ProductCounter";
import { RemoveProductFromCart } from "./RemoveProductFromCart";
import { type Cart } from "@/gql/graphql";
import { formatMoney } from "@/utils/intl";

export const CartListItem = async ({
	item,
	cartId,
	isCheckout,
	itemsLength,
}: {
	item: Cart["items"][0];
	cartId: string;
	isCheckout?: boolean;
	itemsLength: number;
}) => {
	const t = await getTranslations();
	const lang = await getLocale();

	return (
		<tr key={item.product.id} className="h-fit border-b">
			{item.product.images?.[0] && (
				<td className="invisible py-4 sm:visible sm:min-w-48 sm:px-4">
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
				</td>
			)}

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
						<p className="text-lg">
							{t("word-quantity", { quantity: item.quantity })}
						</p>
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
						i18n={{
							remove: t("word-remove"),
						}}
					/>
				)}

				<p>{formatMoney(item.product.price * item.quantity, lang)}</p>
			</td>
		</tr>
	);
};
