import Stripe from "stripe";
import { cookies } from "next/headers";
import { StripeForm } from "./stripeForm";
import { getCartById } from "@/api/cart/getCartById";

export default async function PaymentPage() {
	const cartId = cookies().get("cartId")?.value || "";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is missing");
	}

	const cart = cartId ? await getCartById(cartId) : null;

	if (!cart) {
		return;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const totalAmount = cart.items.reduce(
		(acc, item) => acc + (item.product?.price ?? 0),
		0,
	);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalAmount,
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			orderId: cart.id,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error("Missing client_secret");
	}

	return <StripeForm clientSecret={paymentIntent.client_secret} />;
}
