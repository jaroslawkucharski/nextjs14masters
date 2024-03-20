import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getOrdersList } from "@/api/orders/getOrdersList";
import { formatDate, formatMoney } from "@/utils/intl";
import { Button } from "@/ui/atoms/Button";
import { getSkip } from "@/helpers";
import { PATHS } from "@/constants";

export type OrderPageType = {
	params: {
		page: string;
	};
};

export default async function OrdersPage({ params }: OrderPageType) {
	const t = await getTranslations();
	const lang = await getLocale();

	const user = await currentUser();

	if (!user) {
		redirect(PATHS.SIGN_IN);
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return redirect(PATHS.SIGN_IN);
	}

	const skip = getSkip(params.page);

	const { orders } = await getOrdersList({
		order: "DESC",
		orderBy: "TOTAL",
		skip,
		email,
	});

	return (
		<section>
			{orders.map((order) => (
				<article className="h-fit w-full" key={order.id}>
					<div className="flex flex-col flex-wrap gap-4">
						<div className="flex w-full flex-col justify-between gap-4 md:flex-row">
							<div className="min-w-[500px] md:px-4">
								<p className="text-sm">{t("order-number")}</p>

								<p className="font-bold">{order.id}</p>
							</div>

							<div className="w-full">
								<p className="text-sm">{t("order-articles")}</p>

								<p>
									{order.lines
										.map(({ productQuantity }) => productQuantity)
										.reduce((acc, curr) => acc + curr, 0)}
								</p>
							</div>
						</div>

						<div className="mb-8 flex w-full flex-col justify-between gap-4 border-b pb-8 md:flex-row">
							<div className="min-w-[500px] md:px-4">
								<p className="text-sm">{t("order-date")}</p>

								<p className="font-bold">
									{formatDate({ date: order.createdAt, lang })}
								</p>
							</div>

							<div className="w-full">
								<p className="text-sm">{t("cart-total")}</p>

								<p className="font-bold">
									{formatMoney(order.totalAmount, lang)}
								</p>
							</div>

							<div className="min-w-full sm:min-w-60">
								<Link href={`${PATHS.ORDER}/${order.id}`}>
									<Button>{t("order-check")}</Button>
								</Link>
							</div>
						</div>
					</div>
				</article>
			))}
		</section>
	);
}
