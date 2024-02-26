import { type Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { CornerDownLeft, Store } from "lucide-react";
import { Suspense } from "react";
import { getCartById } from "@/api/getCartById";
import { formatMoney } from "@/utils";
import { PageHeading } from "@/ui/atoms/PageHeading";
import { ProductCounter } from "@/ui/atoms/ProductCounter";
import { ButtonRemoveItem } from "@/ui/atoms/ButtonRemoveItem";

export const metadata: Metadata = {
	title: "Cart",
	description: "Your cart.",
};

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	const cart = cartId ? await getCartById(cartId) : null;

	const total = cart?.items.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0,
	);

	return (
		<>
			<PageHeading title="Your cart" />

			{cartId && (
				<section className="mx-auto flex max-w-md gap-4 overflow-x-auto p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
					<table className="w-full table-auto">
						<thead>
							<tr>
								<th className="sr-only px-4 py-2">Image</th>
								<th className="sr-only px-4 py-2">Name</th>
								<th className="sr-only px-4 py-2">Price</th>
							</tr>
						</thead>
						<tbody>
							{cart?.items.map((item) => (
								<tr key={item.product.id} className="border-b-2">
									<td className="min-w-48 px-4 py-2">
										{item.product.images?.[0] && (
											<Image
												src={item.product.images[0].url}
												alt={item.product.name}
												width={150}
												height={150}
											/>
										)}
									</td>

									<td className="w-full px-4 py-2">
										<p className="mb-8 text-xl">{item.product.name}</p>

										<div className="pr-8 text-sm text-gray-600">
											<Suspense>
												<ProductCounter values={item.quantity} />
											</Suspense>
										</div>
									</td>

									<td className="self-end px-8 py-2">
										<Suspense>
											<ButtonRemoveItem
												cartId={cartId}
												productId={item.product.id}
											/>
										</Suspense>

										<p>{formatMoney(item.product.price * item.quantity)}</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="min-w-[450px] p-10">
						<div className="mb-6">
							<p className="flex w-full justify-between py-2 text-lg text-gray-500">
								<span>Product price:</span>

								<span>{formatMoney(Number(total))}</span>
							</p>

							<p className="flex w-full justify-between py-2 text-lg text-gray-500">
								<span>Delivery:</span>

								<span>{formatMoney(Number(0))}</span>
							</p>

							<p className="mt-2 flex w-full justify-between border-b-2 border-t-2 py-2 text-lg">
								<span>Total amount:</span>

								<span>{formatMoney(Number(total))}</span>
							</p>
						</div>

						<form>
							<button
								type="submit"
								className="w-full rounded-md border bg-gray-900 px-8 py-3 text-white hover:bg-gray-800"
							>
								Order it
							</button>
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
			)}
		</>
	);
}
