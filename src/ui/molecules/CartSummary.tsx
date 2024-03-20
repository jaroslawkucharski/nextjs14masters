import { getLocale, getTranslations } from "next-intl/server";
import { CornerDownLeft, Store } from "lucide-react";
import { type ReactNode } from "react";
import { formatMoney } from "@/utils/intl";

type CartSummaryProps = {
	total: number;
	children: ReactNode;
	isFooter?: boolean;
};

export const CartSummary = async ({
	total,
	children,
	isFooter = true,
}: CartSummaryProps) => {
	const t = await getTranslations();
	const lang = await getLocale();

	return (
		<div className="min-w-full p-4 sm:min-w-[450px] sm:p-10">
			<div className="mb-6">
				<p className="flex w-full justify-between py-2 text-lg text-gray-500">
					<span>{t("cart-product-price")}</span>

					<span>{formatMoney(Number(total), lang)}</span>
				</p>

				<p className="flex w-full justify-between py-2 text-lg text-gray-500">
					<span>{t("cart-delivery")}</span>

					<span>{formatMoney(Number(0), lang)}</span>
				</p>

				<p className="mt-4 flex w-full justify-between border-t py-2 text-lg">
					<span>{t("cart-total")}</span>

					<span>{formatMoney(Number(total), lang)}</span>
				</p>
			</div>

			{children}

			{isFooter && (
				<div className="mt-8 flex flex-col gap-2">
					<p className="flex items-center gap-2 text-sm text-slate-500">
						<Store className="h-4 w-4" />

						<span>{t("cart-free-returns")}</span>
					</p>

					<p className="flex items-center gap-2 text-sm text-slate-500">
						<CornerDownLeft className="h-4 w-4" />

						<span>{t("cart-free-returns-30-days")}</span>
					</p>
				</div>
			)}
		</div>
	);
};
