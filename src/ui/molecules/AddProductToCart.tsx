"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/ui/atoms/Button";

export const AddProductToCart = () => {
	const formStatus = useFormStatus();

	return (
		<Button
			type="submit"
			data-testid="add-to-cart-button"
			disabled={formStatus.pending}
			isLoading={formStatus.pending}
		>
			Add to cart
		</Button>
	);
};
