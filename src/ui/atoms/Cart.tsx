import { ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { getCartById } from "@/api/cart/getCartById";

export const Cart = async () => {
	const cartId = cookies().get("cartId")?.value;

	const cart = cartId ? await getCartById(cartId) : null;

	let productsQuantity = 0;

	if (cart) {
		cart.items.forEach(({ quantity }) => {
			productsQuantity += quantity;
		});
	}

	return (
		<div className="relative self-center">
			<Link href="/cart">
				<ShoppingCart />

				<span className="absolute bottom-4 left-4 rounded-full bg-red-500 px-1 text-xs text-white">
					{productsQuantity}
				</span>
			</Link>
		</div>
	);
};
