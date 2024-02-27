"use client";

import { useState } from "react";
import { changeProductQuantity } from "@/api/changeProductQuantity";
import { Button } from "@/ui/atoms/Button";

type ProductCounterProps = {
	id: string;
	productId: string;
	quantity: number;
};

export const ProductCounter = ({
	id,
	productId,
	quantity,
}: ProductCounterProps) => {
	// TODO - useOptimistic
	const [optimisticQuantity, setOptimisticQuantity] = useState(
		quantity,
		// (_state, newQuantity: number) => newQuantity,
	);

	console.log(quantity);

	const handleDecrement = async () => {
		if (optimisticQuantity > 1) {
			setOptimisticQuantity(optimisticQuantity - 1);

			await changeProductQuantity({
				id,
				productId,
				quantity: optimisticQuantity - 1,
			});
		}
	};

	const handleIncrement = async () => {
		setOptimisticQuantity(optimisticQuantity + 1);

		await changeProductQuantity({
			id,
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
					className="h-8 w-12  text-center text-lg text-gray-950"
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

// "use client";

// import { useState, useOptimistic } from "react";

// type ProductCounterProps = {
// 	values: number;
// };

// export const ProductCounter = ({ values }: ProductCounterProps) => {
// 	const [counter, setCounter] = useState(values);
// 	// const [counter, setCounter] = useOptimistic(values);

// 	return (
// 		<div className="w-full">
// 			<div className="flex flex-nowrap">
// 				<button
// 					onClick={() => counter > 1 && setCounter(counter - 1)}
// 					className="w-8 border bg-gray-950 text-center text-lg text-white"
// 					data-testid="decrement"
// 				>
// 					-
// 				</button>

// 				<input
// 					readOnly
// 					value={counter}
// 					className="w-16 border border-slate-200 px-2 text-center text-lg"
// 					data-testid="quantity"
// 				/>

// 				<button
// 					onClick={() => setCounter(counter + 1)}
// 					className="w-8 border bg-gray-950 text-center text-lg text-white"
// 					data-testid="increment"
// 				>
// 					+
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
