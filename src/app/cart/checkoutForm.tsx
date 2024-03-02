"use client";

// TODO
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect, type FormEvent } from "react";

import "./stripe.css";
import { Button } from "@/ui/atoms/Button";

export function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

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
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3000/cart?intent=success",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message ?? "Something went wrong");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	} as const;

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement
				className="mb-6"
				id="payment-element"
				options={paymentElementOptions}
			/>

			<Button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				isLoading={isLoading}
			>
				Pay now
			</Button>

			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}
