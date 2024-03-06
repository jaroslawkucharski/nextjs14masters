// TODO
import { type Metadata } from "next";
import { cookies } from "next/headers";
import { CornerDownLeft, Store } from "lucide-react";
import { StripeForm } from "./stripeForm";
import { getCartById } from "@/api/cart/getCartById";
import { formatMoney } from "@/utils";
import { PageHeading } from "@/ui/molecules/PageHeading";

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

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	return (
		<>
			<PageHeading title="Your cart" />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
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
