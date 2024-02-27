"use client";

// import { cookies } from "next/headers";
// import { addProductToCart } from "@/api/addProductToCard";
// import { createCart } from "@/api/createCart";
import { useFormStatus } from "react-dom";
import { Button } from "@/ui/atoms/Button";

// type AddProductToCartProps = {
// 	productId: string;
// };

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
