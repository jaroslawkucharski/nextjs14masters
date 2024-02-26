"use client";

import { Trash2 } from "lucide-react";
import { removeProductFromCard } from "@/api/removeProductFromCard";

type ButtonRemoveItemProps = {
	cartId: string;
	productId: string;
};

export const ButtonRemoveItem = async ({
	cartId,
	productId,
}: ButtonRemoveItemProps) => {
	const handleRemoveItemFromCart = async () => {
		"use service";

		if (cartId) {
			const remove = await removeProductFromCard({
				id: cartId,
				productId,
			});

			return remove;
		}
	};

	return (
		<form action={handleRemoveItemFromCart}>
			<button
				className="mb-8 flex items-center gap-1 text-red-500"
				type="submit"
			>
				<Trash2 className="h-4 w-4" /> Remove
			</button>
		</form>
	);
};
