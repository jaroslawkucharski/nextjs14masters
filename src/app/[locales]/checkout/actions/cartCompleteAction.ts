"use server";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PATHS } from "@/constants";
import { cartComplete } from "@/api/cart/cartComplete";

export const cartCompleteAction = async () => {
	const user = await currentUser();

	if (!user) {
		return redirect(PATHS.SIGN_IN);
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return;
	}

	const orderId = await cartComplete(email);

	return orderId;
};
