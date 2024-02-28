"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./checkoutForm";

if (!process.env.STRIPE_PUBLIC_PUBLISHABLE_KEY) {
	throw new Error("Missing STRIPE_PUBLIC_PUBLISHABLE_KEY env variable");
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_PUBLISHABLE_KEY);

export const StripeForm = ({ clientSecret }: { clientSecret: string }) => {
	return (
		<Elements
			options={{ appearance: { theme: "stripe" }, clientSecret }}
			stripe={stripePromise}
		>
			<CheckoutForm />
		</Elements>
	);
};
