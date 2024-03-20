import { type Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { CornerDownLeft, Store } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { EmptyView } from "./EmptyView";
import { SuccessView } from "./SuccessView";
import { paymentAction } from "./actions/paymentAction";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils/intl";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { CheckoutTimeline } from "@/ui/atoms/CheckoutTimeline";
import { checkoutSteps } from "@/utils/checkoutSteps";
import { CHECKOUT_STEPS, PATHS } from "@/constants";

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations("Cart");

	return {
		title: t("title"),
		description: t("description"),
	};
};

type CartPageType = {
	searchParams: {
		intent: string;
		orderId: string;
		searchParams: string;
	};
};

export default async function CartPage({ searchParams }: CartPageType) {
	const t = await getTranslations("Cart");
	const lang = await getLocale();

	const cart = await getCartById();

	if (searchParams.intent === "success") {
		return <SuccessView orderId={searchParams.orderId} />;
	}

	if (!cart) {
		return <EmptyView />;
	}

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	const handleCheckout = async () => {
		"use server";

		await paymentAction();

		redirect(PATHS.CHECKOUT);
	};

	const steps = await checkoutSteps(
		searchParams.intent === "success"
			? CHECKOUT_STEPS.SUMMARY
			: CHECKOUT_STEPS.CART,
	);

	return (
		<>
			<PageHeading title={t("title")} />

			<Suspense>
				<CheckoutTimeline steps={steps} />
			</Suspense>

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				{cart?.items && (
					<CartList items={cart.items as CartItem[]} cartId={cart.id} />
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

					<form action={handleCheckout}>
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
			</section>
		</>
	);
}
