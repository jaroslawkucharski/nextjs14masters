"use client";

import { useState } from "react";

type ProductCounterProps = {
	values: number;
};

export const ProductCounter = ({ values }: ProductCounterProps) => {
	const [counter, setCounter] = useState(values);

	return (
		<div className="w-full">
			<div className="flex flex-nowrap">
				<button
					onClick={() => counter > 1 && setCounter((counter) => counter - 1)}
					className="w-8 border bg-gray-950 text-center text-lg text-white"
					data-testid="decrement"
				>
					-
				</button>

				<input
					readOnly
					value={counter}
					className="w-16 border border-slate-200 px-2 text-center text-lg"
					data-testid="quantity"
				/>

				<button
					onClick={() => setCounter((counter) => counter + 1)}
					className="w-8 border bg-gray-950 text-center text-lg text-white"
					data-testid="increment"
				>
					+
				</button>
			</div>
		</div>
	);
};
