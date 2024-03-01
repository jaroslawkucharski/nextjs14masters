import { type Metadata } from "next";
import { cookies } from "next/headers";
import { CornerDownLeft, Store } from "lucide-react";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
import PaymentPage from "./payment";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { Button } from "@/ui/atoms/Button";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";

export const metadata: Metadata = {
	title: "Cart",
	description: "Your cart.",
};

export type CartPageType = {
	searchParams: {
		payment: string;
	};
};

export default async function CartPage({ searchParams }: CartPageType) {
	const cartId = cookies().get("cartId")?.value || "";

	const cart = cartId ? await getCartById(cartId) : null;

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	const handlePayment = async () => {
		"use server";
		redirect("/cart?payment=waiting");
	};

	// const handlePayment = async () => {
	// 	"use server";

	// 	if (!process.env.STRIPE_SECRET_KEY) {
	// 		throw new Error("Stripe secret key is missing");
	// 	}

	// 	const cart = cartId ? await getCartById(cartId) : null;

	// 	if (!cart) {
	// 		return;
	// 	}

	// 	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	// 		apiVersion: "2023-10-16",
	// 		typescript: true,
	// 	});

	// 	const checkoutSession = await stripe.checkout.sessions.create({
	// 		// payment_method_types: ["card", "blik", "p24", "paynow"],
	// 		payment_method_types: ["card"],
	// 		metadata: {
	// 			cartId: cart.id,
	// 		},
	// 		line_items: cart.items.map((item) => ({
	// 			price_data: {
	// 				currency: "usd",
	// 				product_data: {
	// 					name: item.product.name,
	// 					images: [item.product.images?.[0]?.url || ""],
	// 				},
	// 				unit_amount: item.product.price,
	// 			},
	// 			quantity: item.quantity,
	// 		})),
	// 		mode: "payment",
	// 		success_url:
	// 			"https://example.com/success?sessionId={CHECKOUT_SESSION_ID}",
	// 		cancel_url: "https://example.com/cancel",
	// 	});

	// 	if (!checkoutSession.url) {
	// 		throw new Error("Checkout session URL is missing");
	// 	}

	// 	redirect(checkoutSession.url);
	// };

	if (!cart || !cart.items.length) {
		return (
			<section className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center text-center">
				<h1 className="text-6xl">Your cart is empty.</h1>
				<p className="mt-8 text-xl">
					<Link href="/"> Continue shopping</Link>
				</p>
			</section>
		);
	}

	if (searchParams.payment === "success") {
		return (
			<section className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center text-center">
				<h1 className="text-6xl">Success!</h1>
				<p className="mt-8 text-xl">
					<Link href="/"> Continue shopping</Link>
				</p>
			</section>
		);
	}

	return (
		<>
			<PageHeading title="Your cart" />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				{cart?.items && (
					<CartList items={cart.items as CartItem[]} cartId={cartId} />
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

					{searchParams.payment === "waiting" ? (
						<PaymentPage />
					) : (
						<form action={handlePayment}>
							<Button type="submit">Order it</Button>
						</form>
					)}

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
