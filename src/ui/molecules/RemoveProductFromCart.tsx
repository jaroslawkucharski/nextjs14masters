"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/ui/atoms/Button";
import { removeProductFromCard } from "@/api/cart/removeProductFromCard";
import { removeCookie } from "@/utils/cookies";

type RemoveProductFromCartProps = {
	cartId: string;
	productId: string;
	itemsLength: number;
};

export const RemoveProductFromCart = ({
	productId,
	itemsLength,
}: RemoveProductFromCartProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleremoveProductFromCard = () => {
		startTransition(async () => {
			await removeProductFromCard(productId);

			if (itemsLength === 1) {
				await removeCookie("cartId");
			}

			router.refresh();
		});
	};

	return (
		<Button
			variant="remove"
			onClick={handleremoveProductFromCard}
			disabled={isPending}
		>
			<Trash2 className="h-3 w-3" /> Remove
		</Button>
	);
};
