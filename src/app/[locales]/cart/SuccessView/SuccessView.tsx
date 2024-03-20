import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CHECKOUT_STEPS, PATHS } from "@/constants";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { checkoutSteps } from "@/utils/checkoutSteps";
import { CheckoutTimeline } from "@/ui/atoms/CheckoutTimeline";

export const SuccessView = async ({ orderId }: { orderId: string }) => {
	const t = await getTranslations();

	if (!orderId) {
		return redirect(PATHS.CART);
	}

	const steps = await checkoutSteps(CHECKOUT_STEPS.SUMMARY);

	return (
		<>
			<PageHeading title={t("cart-summary")} />

			<Suspense>
				<CheckoutTimeline steps={steps} />
			</Suspense>

			<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
				<Package className="h-28 w-28 text-green-500" />

				<p className="my-2 text-2xl">{t("checkout-success-title")}</p>

				<p className="mt-2 text-2xl font-semibold">
					{t("checkout-success-order")}
				</p>

				<p className="mb-2 text-2xl text-green-500">{orderId}</p>

				<Link
					href={`${PATHS.ORDER}/${orderId}`}
					className="text-sm uppercase hover:underline"
				>
					{t("checkout-success-link")}
				</Link>
			</div>
		</>
	);
};
