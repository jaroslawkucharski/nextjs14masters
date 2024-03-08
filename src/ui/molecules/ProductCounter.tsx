"use client";

import { useOptimistic } from "react";
import { changeProductQuantity } from "@/api/cart/changeProductQuantity";
import { Button } from "@/ui/atoms/Button";

type ProductCounterProps = {
	id: string;
	productId: string;
	quantity: number;
};

export const ProductCounter = ({
	productId,
	quantity,
}: ProductCounterProps) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	const handleDecrement = async () => {
		if (optimisticQuantity > 1) {
			setOptimisticQuantity(optimisticQuantity - 1);

			await changeProductQuantity({
				productId,
				quantity: optimisticQuantity - 1,
			});
		}
	};

	const handleIncrement = async () => {
		setOptimisticQuantity(optimisticQuantity + 1);

		await changeProductQuantity({
			productId,
			quantity: optimisticQuantity + 1,
		});
	};

	return (
		<form className="w-full">
			<div className="flex flex-nowrap">
				<Button
					type="submit"
					variant="square"
					formAction={handleDecrement}
					data-testid="decrement"
				>
					-
				</Button>

				<p
					className="h-8 w-12 text-center text-lg text-gray-950"
					data-testid="quantity"
				>
					{optimisticQuantity}
				</p>

				<Button
					type="submit"
					variant="square"
					formAction={handleIncrement}
					data-testid="increment"
				>
					+
				</Button>
			</div>
		</form>
	);
};
