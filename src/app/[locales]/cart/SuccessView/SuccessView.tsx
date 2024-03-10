import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Stripe from "stripe";

export const SuccessView = async ({ intent }: { intent: string }) => {
	const t = await getTranslations("SuccessCart");

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

			<p className="my-2 text-2xl">{t("title")}</p>

			<p className="mt-2 text-2xl font-semibold">{t("order")}</p>

			<p className="mb-2 text-2xl text-green-500">
				{paymentIntents.metadata.orderId}
			</p>

			<Link href="/orders" className="text-sm uppercase hover:underline">
				{t("back")}
			</Link>
		</div>
	);
};
