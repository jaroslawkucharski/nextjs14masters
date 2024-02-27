"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/ui/atoms/Button";
import { removeProductFromCard } from "@/api/removeProductFromCard";

type RemoveProductFromCartProps = {
	cartId: string;
	productId: string;
};

export const RemoveProductFromCart = ({
	cartId,
	productId,
}: RemoveProductFromCartProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleremoveProductFromCard = () => {
		startTransition(async () => {
			await removeProductFromCard({
				id: cartId,
				productId,
			});

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
