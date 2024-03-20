import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { EmptyView } from "./EmptyView";
import { SuccessView } from "./SuccessView";
import { paymentAction } from "./actions/paymentAction";
import { getCartById } from "@/api/cart/getCartById";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { CheckoutTimeline } from "@/ui/atoms/CheckoutTimeline";
import { checkoutSteps } from "@/utils/checkoutSteps";
import { CHECKOUT_STEPS, PATHS } from "@/constants";
import { CartSummary } from "@/ui/molecules/CartSummary";

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations();

	return {
		title: t("cart-title"),
		description: t("cart-description"),
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
	const t = await getTranslations();

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
			<PageHeading title={t("cart-title")} />

			<Suspense>
				<CheckoutTimeline steps={steps} />
			</Suspense>

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				{cart?.items && (
					<CartList items={cart.items as CartItem[]} cartId={cart.id} />
				)}

				<CartSummary total={total}>
					<form action={handleCheckout}>
						<StatusButton>{t("cart-checkout")}</StatusButton>
					</form>
				</CartSummary>
			</section>
		</>
	);
}
