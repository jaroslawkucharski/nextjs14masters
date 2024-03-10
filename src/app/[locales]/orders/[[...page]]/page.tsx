import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getOrdersList } from "@/api/orders/getOrdersList";
import { formatDate, formatMoney } from "@/utils/intl";
import { Button } from "@/ui/atoms/Button";
import { getSkip } from "@/helpers";

export type OrderPageType = {
	params: {
		page: string;
	};
};

export default async function OrderPage({ params }: OrderPageType) {
	const lang = await getLocale();

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

	const paymentIntentsList = await stripe.paymentIntents.list();

	if (!email) {
		return <div>User does not have email</div>;
	}

	const skip = getSkip(params.page);

	const { orders } = await getOrdersList({
		skip,
		email,
	});

	const status = (cartId: string) =>
		paymentIntentsList.data.find(
			(payment) => payment.metadata.orderId === cartId,
		)?.status;

	interface Statuses {
		[key: string]: { name: string; color: string };
	}

	const statuses: Statuses = {
		succeeded: { name: "success", color: "text-green-500" },
		processing: { name: "processing", color: "text-orange-400" },
		requires_payment_method: {
			name: "payment required",
			color: "text-red-600",
		},
	};

	return orders.length === 0 ? (
		<div>No orders found</div>
	) : (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			{orders.map((order) => (
				<article className="h-fit w-full" key={order.id}>
					<div className="flex flex-col gap-4">
						<div className="flex w-full flex-wrap justify-between gap-4 sm:flex-nowrap">
							<div className="min-w-[500px] sm:px-4">
								<p className="text-sm">Order number:</p>

								<p className="font-bold">{order.id}</p>
							</div>

							<div className="w-full">
								<p className="text-sm">Articles:</p>

								<p>
									{order.lines
										.map(({ productQuantity }) => productQuantity)
										.reduce((acc, curr) => acc + curr, 0)}
								</p>
							</div>

							<div className="min-w-60 text-right">
								<p className="text-sm">
									Status:{" "}
									<span
										className={`font-bold ${statuses[status(order.lines[0]?.cartId ?? "") as string]?.color}`}
									>
										{
											statuses[status(order.lines[0]?.cartId ?? "") as string]
												?.name
										}
									</span>
								</p>
							</div>
						</div>

						<div className="mb-8 flex w-full flex-wrap justify-between gap-4 border-b pb-8 sm:flex-nowrap">
							<div className="min-w-[500px] sm:px-4">
								<p className="text-sm">Date of order:</p>

								<p className="font-bold">{formatDate(order.createdAt, lang)}</p>
							</div>

							<div className="w-full">
								<p className="text-sm">Total:</p>

								<p className="font-bold">
									{formatMoney(order.totalAmount, lang)}
								</p>
							</div>

							<div className="min-w-60">
								<Link href={`/order/${order.id}`}>
									<Button>Check order</Button>
								</Link>
							</div>
						</div>
					</div>
				</article>
			))}
		</section>
	);
}
