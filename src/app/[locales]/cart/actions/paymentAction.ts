"use server";

import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getCartById } from "@/api/cart/getCartById";
import { PATHS } from "@/constants";

export const paymentAction = async () => {
	const user = await currentUser();
	const lang = await getLocale();

	const cart = await getCartById();

	if (!cart) {
		return redirect(PATHS.CART);
	}

	const amount = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	if (!user) {
		return redirect(PATHS.SIGN_IN);
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is missing");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: lang ? "pln" : "usd",
		receipt_email: email,
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			orderId: cart?.id,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error("Missing client_secret");
	}

	if (!email) {
		return;
	}

	return redirect(`${PATHS.CHECKOUT}?intent=${paymentIntent.client_secret}`);
};
