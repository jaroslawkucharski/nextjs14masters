import { type Metadata } from "next";
import { cookies } from "next/headers";
import { CornerDownLeft, Store } from "lucide-react";
import Link from "next/link";
import { StripeForm } from "./stripeForm";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartList } from "@/ui/organisms/CartList";
import { type CartItem } from "@/gql/graphql";

export const metadata: Metadata = {
	title: "Checkout",
	description: "Complete your shopping",
};

export type CartPageType = {
	searchParams: {
		intent: string;
		payment_intent: string;
	};
};

export default async function CartPage({ searchParams }: CartPageType) {
	const cartId = cookies().get("cartId")?.value || "";

	const cart = cartId ? await getCartById(cartId) : null;

	if (!cart) {
		return;
	}

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

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

	// TODO
	if (searchParams.intent === "success") {
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
					<CartList
						items={cart.items as CartItem[]}
						cartId={cartId}
						isCheckout
					/>
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

					<StripeForm clientSecret={searchParams.intent} />

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
