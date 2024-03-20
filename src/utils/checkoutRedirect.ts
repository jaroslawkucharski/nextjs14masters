import { redirect } from "next/navigation";
import { PATHS } from "@/constants";

export const checkoutRedirect = async (intent: string) => {
	if (!intent) {
		redirect(PATHS.CART);
	}
};
