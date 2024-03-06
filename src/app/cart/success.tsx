import { Package } from "lucide-react";
import Link from "next/link";
import Stripe from "stripe";

export default async function Success({ intent }: { intent: string }) {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is missing");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const paymentIntents = await stripe.paymentIntents.retrieve(intent);

	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<Package className="h-28 w-28 text-green-500" />

			<p className="my-2 text-2xl">Hurray! Your order has been paid</p>

			<p className="mt-2 text-2xl font-semibold">Your order number:</p>

			<p className="mb-2 text-2xl text-green-500">
				{paymentIntents.metadata.orderId}
			</p>

			<Link href="/orders" className="text-sm uppercase hover:underline">
				Go to orders
			</Link>
		</div>
	);
}
