"use client";

import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect, type FormEvent } from "react";
import { type StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { cartCompleteAction } from "../actions/cartCompleteAction";
import { Button } from "@/ui/atoms/Button";
import { PATHS } from "@/constants";

type CheckoutFormProps = {
	i18n: {
		payNow: string;
	};
	shipping: StripeAddressElementChangeEvent["value"];
};

export const CheckoutForm = ({ i18n, shipping }: CheckoutFormProps) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const requiredShippingFields =
		shipping?.name &&
		shipping?.address.line1 &&
		shipping?.address.city &&
		shipping?.address.state &&
		shipping?.address.postal_code &&
		shipping?.address.country;

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret",
		);

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case "succeeded":
						setMessage("Payment succeeded!");
						break;
					case "processing":
						setMessage("Your payment is processing.");
						break;
					case "requires_payment_method":
						setMessage("Your payment was not successful, please try again.");
						break;
					default:
						setMessage("Something went wrong.");
						break;
				}
			})
			.catch(console.error);
	}, [stripe]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return console.log("Stripe or elements not found");
		}

		setIsLoading(true);

		const orderId = await cartCompleteAction();

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				shipping: {
					name: shipping?.name,
					address: {
						line1: shipping?.address.line1,
						line2: shipping?.address.line2 as string | undefined,
						city: shipping?.address.city,
						state: shipping?.address.state,
						postal_code: shipping?.address.postal_code,
						country: shipping?.address.country,
					},
				},
				return_url: `${process.env.NEXT_PUBLIC_URL}${PATHS.CART}?intent=success&orderId=${orderId?.id}`,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message ?? "Something went wrong");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement
				className="mb-6"
				id="payment-element"
				options={{
					layout: "tabs",
				}}
			/>

			<Button
				disabled={isLoading || !stripe || !elements || !requiredShippingFields}
				id="submit"
				isLoading={isLoading}
			>
				{i18n.payNow}
			</Button>

			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};
