import { type Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { StripeForm } from "./StripeForm";
import { getCartById } from "@/api/cart/getCartById";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { checkoutSteps } from "@/utils/checkoutSteps";
import { CheckoutTimeline } from "@/ui/atoms/CheckoutTimeline";
import { checkoutRedirect } from "@/utils/checkoutRedirect";
import { CHECKOUT_STEPS, PATHS } from "@/constants";

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
	};
};

export default async function CartPage({ searchParams }: CartPageType) {
	const t = await getTranslations("Cart");
	const lang = await getLocale();
	const user = await currentUser();

	if (!user) {
		return redirect(PATHS.SIGN_IN);
	}

	await checkoutRedirect(searchParams.intent);

	const cart = await getCartById();

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	const steps = await checkoutSteps(CHECKOUT_STEPS.PAYMENT);

	return (
		<>
			<PageHeading title="Your cart" />

			<Suspense>
				<CheckoutTimeline steps={steps} />
			</Suspense>

			<StripeForm
				clientSecret={searchParams.intent}
				total={total}
				lang={lang}
				i18n={{
					payNow: t("pay-now"),
					productPrice: t("product-price"),
					delivery: t("delivery"),
					total: t("total"),
					freeReturns: t("free-returns"),
					freeReturns30Days: t("free-returns-30-days"),
				}}
			/>
		</>
	);
}
