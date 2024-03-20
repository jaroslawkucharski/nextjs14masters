import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { paymentAction } from "../../cart/actions/paymentAction";
import { EmptyView } from "../../cart/EmptyView";
import { Overlay } from "@/ui/atoms/Overlay";
import { getCartById } from "@/api/cart/getCartById";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { getCookie } from "@/utils/cookies";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { CartSummary } from "@/ui/molecules/CartSummary";
import { PATHS } from "@/constants";

export default async function ModalCart() {
	const t = await getTranslations();

	const cartId = await getCookie("cartId");

	const cart = await getCartById();

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	const handleCheckout = async () => {
		"use server";

		await paymentAction();

		redirect(PATHS.CHECKOUT);
	};

	return (
		<>
			<Overlay />

			<div className="animation-slide-from-right fixed bottom-0 right-0 top-0 z-40 flex h-full w-full min-w-full flex-col overflow-hidden bg-white shadow-xl sm:min-w-[470px] lg:w-1/2 xl:w-1/6">
				{cart && cartId && total ? (
					<>
						<div className=" overflow-auto">
							{cart?.items && (
								<CartList items={cart.items as CartItem[]} cartId={cartId} />
							)}
						</div>

						<CartSummary total={total}>
							<form action={handleCheckout}>
								<StatusButton>{t("cart-checkout")}</StatusButton>
							</form>
						</CartSummary>
					</>
				) : (
					<EmptyView />
				)}
			</div>
		</>
	);
}
