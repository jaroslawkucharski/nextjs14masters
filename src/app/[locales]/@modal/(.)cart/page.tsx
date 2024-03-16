import { getLocale, getTranslations } from "next-intl/server";
import { CornerDownLeft, Store } from "lucide-react";
import { paymentAction } from "../../cart/actions/paymentAction";
import { Overlay } from "@/ui/atoms/Overlay";
import { getCartById } from "@/api/cart/getCartById";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { getCookie } from "@/utils/cookies";
import { formatMoney } from "@/utils/intl";
import { StatusButton } from "@/ui/molecules/StatusButton";

export default async function ModalCart() {
	const t = await getTranslations("Cart");
	const lang = await getLocale();

	const cartId = await getCookie("cartId");

	if (!cartId) {
		return null;
	}

	const cart = await getCartById();

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	return (
		<>
			<Overlay />

			<div className="animation-slide-from-right fixed bottom-0 right-0 top-0 z-40 flex h-full w-full min-w-full flex-col overflow-hidden bg-white shadow-xl sm:min-w-[470px] lg:w-1/2 xl:w-1/6">
				<div className=" overflow-auto">
					{cart?.items && (
						<CartList items={cart.items as CartItem[]} cartId={cartId} />
					)}
				</div>

				<div className="min-w-full p-4 sm:min-w-[450px] sm:p-10">
					<div className="mb-6">
						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>{t("product-price")}</span>

							<span>{formatMoney(Number(total), lang)}</span>
						</p>

						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>{t("delivery")}</span>

							<span>{formatMoney(Number(0), lang)}</span>
						</p>

						<p className="mt-4 flex w-full justify-between border-t py-2 text-lg">
							<span>{t("total")}</span>

							<span>{formatMoney(Number(total), lang)}</span>
						</p>
					</div>

					<form action={paymentAction}>
						<StatusButton>{t("checkout")}</StatusButton>
					</form>

					<div className="mt-8 flex flex-col gap-2">
						<p className="flex items-center gap-2 text-sm text-slate-500">
							<Store className="h-4 w-4" />

							<span>{t("free-returns")}</span>
						</p>

						<p className="flex items-center gap-2 text-sm text-slate-500">
							<CornerDownLeft className="h-4 w-4" />

							<span>{t("free-returns-30-days")}</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
