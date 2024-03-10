import { Overlay } from "@/ui/atoms/Overlay";
import { getCartById } from "@/api/cart/getCartById";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { getCookie } from "@/utils/cookies";

export default async function ModalCart() {
	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const cart = await getCartById();

	return (
		<>
			<Overlay />

			{/* TODO */}
			<div className="animation-slide-from-right fixed bottom-0 right-0 top-0 z-40 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className=" overflow-auto">
					{cart?.items && (
						<CartList items={cart.items as CartItem[]} cartId={cartId} />
					)}
				</div>
			</div>
		</>
	);
}
