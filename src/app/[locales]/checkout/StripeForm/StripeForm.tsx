"use client";

import { AddressElement, Elements } from "@stripe/react-stripe-js";
import {
	type StripeAddressElementChangeEvent,
	loadStripe,
} from "@stripe/stripe-js";
import { CornerDownLeft, Store } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckoutForm } from "../CheckoutForm";
import { formatMoney } from "@/utils/intl";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
	throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable");
}

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

type StripeFormProps = {
	total?: number;
	lang: string;
	clientSecret: string;
};

export const StripeForm = ({ total, lang, clientSecret }: StripeFormProps) => {
	const t = useTranslations();

	const [totalAmount] = useState(total);

	const [shipping, setShipping] = useState<
		StripeAddressElementChangeEvent["value"]
	>({
		name: "",
		address: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postal_code: "",
			country: "",
		},
	});

	return (
		<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
			<Elements
				options={{ appearance: { theme: "stripe" }, clientSecret }}
				stripe={stripePromise}
			>
				<div className="flex w-full justify-center p-4 sm:p-10">
					<AddressElement
						options={{ mode: "shipping" }}
						className="w-2/3"
						onChange={(event) => {
							setShipping(event.value);
						}}
					/>
				</div>

				<div className="min-w-full p-4 sm:min-w-[450px] sm:p-10">
					<div className="mb-6">
						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>{t("cart-product-price")}</span>

							<span>{formatMoney(Number(totalAmount), lang)}</span>
						</p>

						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>{t("cart-delivery")}</span>

							<span>{formatMoney(Number(0), lang)}</span>
						</p>

						<p className="mt-4 flex w-full justify-between border-t py-2 text-lg">
							<span>{t("cart-total")}</span>

							<span>{formatMoney(Number(totalAmount), lang)}</span>
						</p>
					</div>

					<CheckoutForm shipping={shipping} />

					<div className="mt-8 flex flex-col gap-2">
						<p className="flex items-center gap-2 text-sm text-slate-500">
							<Store className="h-4 w-4" />

							<span>{t("cart-free-returns")}</span>
						</p>

						<p className="flex items-center gap-2 text-sm text-slate-500">
							<CornerDownLeft className="h-4 w-4" />

							<span>{t("cart-free-returns-30-days")}</span>
						</p>
					</div>
				</div>
			</Elements>
		</section>
	);
};
