import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { getCartById } from "@/api/cart/getCartById";
import { PATHS } from "@/constants";

export const Cart = async () => {
	const cart = await getCartById();

	let productsQuantity = 0;

	if (cart) {
		cart.items.forEach(({ quantity }) => {
			productsQuantity += quantity;
		});
	}

	return (
		<div className="relative self-center">
			<Link href={PATHS.CART}>
				<ShoppingCart className="text-gray-500 hover:text-gray-950" />

				<span className="absolute bottom-4 left-4 rounded-full bg-red-500 px-1 text-xs text-white">
					{productsQuantity}
				</span>
			</Link>
		</div>
	);
};
