import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PATHS } from "@/constants";

export const SuccessView = async ({ orderId }: { orderId: string }) => {
	const t = await getTranslations("SuccessCart");

	if (!orderId) {
		return redirect(PATHS.CART);
	}

	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<Package className="h-28 w-28 text-green-500" />

			<p className="my-2 text-2xl">{t("title")}</p>

			<p className="mt-2 text-2xl font-semibold">{t("order")}</p>

			<p className="mb-2 text-2xl text-green-500">{orderId}</p>

			<Link href={PATHS.ORDERS} className="text-sm uppercase hover:underline">
				{t("back")}
			</Link>
		</div>
	);
};
