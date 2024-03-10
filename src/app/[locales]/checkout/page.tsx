import { type Metadata } from "next";
import { CornerDownLeft, Store } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { StripeForm } from "./StripeForm";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils/intl";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations("Checkout");

	return {
		title: t("title"),
		description: t("description"),
	};
};

export type CartPageType = {
	searchParams: {
		intent: string;
		payment_intent: string;
		cartId: string;
	};
};

export default async function CartPage({ searchParams }: CartPageType) {
	const t = await getTranslations("Cart");
	const lang = await getLocale();

	const cart = await getCartById(searchParams.cartId);

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	return (
		<>
			<PageHeading title="Your cart" />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				{cart?.items && (
					<CartList
						items={cart.items as CartItem[]}
						cartId={cart.id}
						isCheckout
					/>
				)}

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

					<StripeForm
						clientSecret={searchParams.intent}
						i18n={{ payNow: t("pay-now") }}
					/>

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
			</section>
		</>
	);
}
