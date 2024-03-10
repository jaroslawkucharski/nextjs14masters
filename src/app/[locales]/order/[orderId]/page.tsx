import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/api/orders/getOrderById";

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
	const orderId = params.orderId;

	const order = await getOrderById(orderId);

	if (!order && !orderId) {
		return notFound();
	}

	return (
		<>
			<section className="mx-auto max-w-md p-12 pt-10 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl lg:pt-10">
				{JSON.stringify(order)}
			</section>
		</>
	);
}
