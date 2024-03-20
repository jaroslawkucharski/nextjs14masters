import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { getLocale, getTranslations } from "next-intl/server";
import { CreditCard } from "lucide-react";
import { getOrderById } from "@/api/orders/getOrderById";
import { formatDate } from "@/utils/intl";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { CartSummary } from "@/ui/molecules/CartSummary";
import { CartList } from "@/ui/organisms/CartList";

export type OrderPageType = {
	params: {
		orderId: string;
	};
};

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: t("orders-title"),
		description: t("orders-description"),
	};
}

export default async function OrderPage({ params }: OrderPageType) {
	const t = await getTranslations();
	const lang = await getLocale();

	const orderId = params.orderId;

	const order = await getOrderById(orderId);

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is missing");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const paymentIntentsList = await stripe.paymentIntents.search({
		query: `metadata["orderId"]:"${order?.lines[0]?.cartId}"`,
	});

	if (!order || !orderId) {
		return notFound();
	}

	return (
		<>
			<PageHeading title={t("order-title")} />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto sm:max-w-2xl sm:p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				<article className="h-fit w-full">
					<p className="mb-2 font-semibold">{t("order-date")}</p>

					<p className="mb-4">
						{formatDate({
							date: order?.createdAt,
							lang,
							time: true,
						})}
					</p>

					<p className="mt-4 font-semibold sm:mt-10">{t("order-lines")}</p>

					{order?.lines && (
						<CartList
							items={order.lines.map((line) => ({
								product: {
									id: line.productId.toString(),
									price: line.productPrice,
									name: line.productName,
									categories: [],
									collections: [],
									description: "",
									images: [],
									reviews: [],
									slug: line.productSlug,
								},
								quantity: line.productQuantity,
							}))}
							cartId={order.id}
							isCheckout
						/>
					)}
				</article>

				<div>
					<p className="mb-2 px-4 font-semibold sm:px-10">
						{t("order-number")}
					</p>

					<p className="px-4 sm:px-10">{order?.id}</p>

					<CartSummary total={order?.totalAmount} isFooter={false}>
						<p className="mb-2 font-semibold">{t("order-payment")}</p>

						<div className="flex w-full justify-between gap-12 rounded-md border border-gray-200 p-4">
							<div>
								<p className="text-sm text-gray-500">{t("order-address")}</p>

								<p>{paymentIntentsList.data[0]?.shipping?.name}</p>
								<p>{paymentIntentsList.data[0]?.shipping?.address?.line1}</p>
								<p>{paymentIntentsList.data[0]?.shipping?.address?.line2}</p>
								<p>
									{paymentIntentsList.data[0]?.shipping?.address?.postal_code}
								</p>
								<p>{paymentIntentsList.data[0]?.shipping?.address?.city}</p>
								<p>{paymentIntentsList.data[0]?.shipping?.address?.country}</p>
							</div>

							<div>
								<p className="text-sm text-gray-500">
									{t("order-payment-method")}
								</p>

								<p className="flex items-center gap-1">
									<CreditCard className="h-4 w-4" /> {t("order-payment-type")}
								</p>
							</div>
						</div>
					</CartSummary>
				</div>
			</section>
		</>
	);
}
