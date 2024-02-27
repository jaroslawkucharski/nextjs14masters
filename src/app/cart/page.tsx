import { type Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { CornerDownLeft, Store, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getCartById } from "@/api/getCartById";
import { formatMoney } from "@/utils";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { Button } from "@/ui/atoms/Button";
import { removeProductFromCard } from "@/api/removeProductFromCard";
import { ProductCounter } from "@/ui/molecules/ProductCounter";

export const metadata: Metadata = {
	title: "Cart",
	description: "Your cart.",
};

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value || "";

	const cart = cartId ? await getCartById(cartId) : null;

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	if (!cart) {
		redirect("/");
	}

	return (
		<>
			<PageHeading title="Your cart" />

			<section className="mx-auto flex max-w-md flex-col gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
				<table className="table h-fit w-full">
					<thead>
						<tr>
							<th className="sr-only px-4 py-2">Image</th>
							<th className="sr-only px-4 py-2">Name</th>
							<th className="sr-only px-4 py-2">Price</th>
						</tr>
					</thead>
					<tbody>
						{cart?.items &&
							cart.items.map((item) => (
								<tr key={item.product.id} className="h-fit border-b">
									<td className="invisible py-4 sm:visible sm:min-w-48 sm:px-4">
										{item.product.images?.[0] && (
											<Image
												src={item.product.images[0].url}
												alt={item.product.name}
												width={150}
												height={150}
											/>
										)}
									</td>

									<td className="w-full px-4 py-8">
										<p className="mb-10 text-xl">{item.product.name}</p>

										<div className="pr-8 text-sm text-gray-600">
											<ProductCounter
												quantity={item.quantity}
												productId={item.product.id}
												id={cartId}
											/>
										</div>
									</td>

									<td className="self-end px-4 py-8">
										<form
											action={async () => {
												"use server";

												if (cartId) {
													const remove = await removeProductFromCard({
														id: cartId,
														productId: item.product.id,
													});

													return remove;
												}
											}}
										>
											<Button variant="remove">
												<Trash2 className="h-3 w-3" /> Remove
											</Button>
										</form>

										<p>{formatMoney(item.product.price * item.quantity)}</p>
									</td>
								</tr>
							))}
					</tbody>
				</table>

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

					<form>
						<Button type="submit">Order it</Button>
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