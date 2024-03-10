import { type Metadata } from "next";
import { notFound } from "next/navigation";
// import { getLocale } from "next-intl/server";
import { getOrderById } from "@/api/orders/getOrderById";
// import { formatDate, formatMoney } from "@/utils/intl";

export type OrderPageType = {
	params: {
		orderId: string;
	};
};

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Order",
	};
}

export default async function OrderPage({ params }: OrderPageType) {
	// const lang = await getLocale();

	const orderId = params.orderId;

	const order = await getOrderById(orderId);

	if (!order && !orderId) {
		return notFound();
	}

	return (
		<>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				<article className="h-fit w-full">
					<div className="flex flex-col gap-4">
						<div className="flex w-full flex-wrap justify-between gap-4 sm:flex-nowrap">
							<div className="min-w-[500px] sm:px-4">
								<p className="text-sm">Order number:</p>

								<p className="font-bold">{order?.id}</p>
							</div>

							<div className="w-full">
								<p className="text-sm">Articles:</p>

								<div>
									{order?.lines.map(
										({
											productName,
											productQuantity,
											productPrice,
											productId,
										}) => (
											<div key={productId}>
												<p>{productName}</p>

												<p>{productQuantity}</p>

												<p>{productPrice}</p>
											</div>
										),
									)}
								</div>
							</div>

							<div className="min-w-60 text-right">
								<p className="text-sm">
									Status:{" "}
									{/* <span
										className={`font-bold ${statuses[status(order.lines[0]?.cartId ?? "") as string]?.color}`}
									>
										{
											statuses[status(order.lines[0]?.cartId ?? "") as string]
												?.name
										}
									</span> */}
								</p>
							</div>
						</div>

						<div className="mb-8 flex w-full flex-wrap justify-between gap-4 border-b pb-8 sm:flex-nowrap">
							<div className="min-w-[500px] sm:px-4">
								<p className="text-sm">Date of order:</p>

								<p className="font-bold">
									{/* {formatDate(order?.createdAt, lang)} */}
								</p>
							</div>

							<div className="w-full">
								<p className="text-sm">Total:</p>

								<p className="font-bold">
									{/* {formatMoney(order?.totalAmount, lang)} */}
								</p>
							</div>
						</div>
					</div>
				</article>
			</section>

			<section className="mx-auto max-w-md p-12 pt-10 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl lg:pt-10">
				{JSON.stringify(order)}

				{order?.id}

				{/* {order?.lines.map((line) => <p>{line.productName}</p>)} */}
			</section>
		</>
	);
}
