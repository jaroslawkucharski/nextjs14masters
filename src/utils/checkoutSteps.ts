import { getTranslations } from "next-intl/server";
import { CHECKOUT_STEPS } from "@/constants";

export const checkoutSteps = async (path: string) => {
	const t = await getTranslations();

	const steps = [
		{ label: t("cart-title"), id: CHECKOUT_STEPS.CART },
		{ label: t("checkout-title"), id: CHECKOUT_STEPS.PAYMENT },
		{ label: t("cart-summary"), id: CHECKOUT_STEPS.SUMMARY },
	];

	const stepStatuses = steps.map((step) => {
		const isActive = step.id === path;

		const isCompleted =
			steps.findIndex((currentStep) => currentStep.id === path) >
			steps.findIndex((currentStep) => currentStep.id === step.id);

		return {
			id: step.id,
			label: step.label,
			status: isCompleted
				? "completed"
				: isActive
					? "active"
					: ("upcoming" as "completed" | "active" | "upcoming"),
		};
	});

	return stepStatuses;
};
