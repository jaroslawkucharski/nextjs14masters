import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getOrdersList } from "@/api/orders/getOrdersList";

export default async function OrderPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return <div>User does not have email</div>;
	}

	const orders = await getOrdersList({ email, take: 10, skip: 10 });

	return (
		<div className="pt-36">
			<h1>{user.firstName}&rsquo;s Orders</h1>

			{orders.length === 0 ? (
				<div>No orders found</div>
			) : (
				<ul>
					{/* TODO */}
					{/* {orders.map(
						(order) =>
							order.id &&
							order.createdAt && (
								<li key={order.id}>
									<div>{order.id}</div>
									<div>{order.lines as React.ReactNode}</div>
									<div>{order.status}</div>
									<div>
										<time dateTime={order.createdAt as string}>
											{order.createdAt as React.ReactNode}
										</time>
									</div>
								</li>
							),
					)} */}
				</ul>
			)}
		</div>
	);
}
