import { type Metadata } from "next";
import { CornerDownLeft, Shirt, Store } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import Success from "./success";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils/intl";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";
import { cartComplete } from "@/api/cart/cartComplete";
import { StatusButton } from "@/ui/molecules/StatusButton";

export const metadata: Metadata = {
	title: "Cart",
	description: "Your cart.",
};

export default async function CartPage({
	searchParams,
}: {
	searchParams: { intent: string; payment_intent: string };
}) {
	const cart = await getCartById();

	if (searchParams.intent === "success") {
		return <Success intent={searchParams.payment_intent} />;
	}

	if (!cart) {
		return (
			<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
				<Shirt className="h-28 w-28 text-slate-500" />

				<p className="my-2 text-2xl">Your cart is empty.</p>

				<Link href="/" className="text-sm uppercase hover:underline">
					Continue shopping
				</Link>
			</div>
		);
	}

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	const handlePayment = async () => {
		"use server";

		const user = await currentUser();

		if (!user) {
			redirect("/sign-in");
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
			amount: total,
			currency: "usd",
			receipt_email: email,
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

		if (!email) {
			return;
		}

		await cartComplete(email);

		redirect(`/checkout?intent=${paymentIntent.client_secret}`);
	};

	return (
		<>
			<PageHeading title="Your cart" />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				{cart?.items && (
					<CartList items={cart.items as CartItem[]} cartId={cart.id} />
				)}

				<div className="min-w-full p-4 sm:min-w-[450px] sm:p-10">
					<div className="mb-6">
						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>Product price:</span>

							<span>{formatMoney(Number(total))}</span>
						</p>

						<p className="flex w-full justify-between py-2 text-lg text-gray-500">
							<span>Delivery:</span>

							<span>{formatMoney(Number(0))}</span>
						</p>

						<p className="mt-4 flex w-full justify-between border-t py-2 text-lg">
							<span>Total amount:</span>

							<span>{formatMoney(Number(total))}</span>
						</p>
					</div>

					<form action={handlePayment}>
						<StatusButton>Order it</StatusButton>
					</form>

					<div className="mt-8 flex flex-col gap-2">
						<p className="flex items-center gap-2 text-sm text-slate-500">
							<Store className="h-4 w-4" />

							<span>Free returns always</span>
						</p>

						<p className="flex items-center gap-2 text-sm text-slate-500">
							<CornerDownLeft className="h-4 w-4" />

							<span>Free returns within 30 days</span>
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
