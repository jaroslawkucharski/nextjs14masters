import { type Metadata } from "next";
import { cookies } from "next/headers";
import { getCartById } from "@/api/getCartById";

export const metadata: Metadata = {
	title: "Cart",
	description: "Your cart.",
};

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	const cart = cartId ? await getCartById(cartId) : null;

	return (
		<>
			<p>
				{cart?.items.map((item) => {
					return (
						<span key={item.product.id}>
							{item.product.name} {item.quantity}
						</span>
					);
				})}
			</p>
		</>
	);
}
