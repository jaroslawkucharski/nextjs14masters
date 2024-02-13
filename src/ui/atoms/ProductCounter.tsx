"use client";

import { type ReactNode, useState } from "react";

export const ProductCounter = ({ children }: { children: ReactNode }) => {
	const [counter, setCounter] = useState(0);

	return (
		<div className="w-full p-6">
			<div className="flex flex-nowrap">
				<button
					onClick={() => setCounter((counter) => counter + 1)}
					className="border bg-gray-950 px-4 text-xl text-white"
				>
					+
				</button>

				<input
					readOnly
					value={counter}
					className="w-full border border-slate-200 px-2 text-center text-xl"
				/>

				<button
					onClick={() => setCounter((counter) => counter - 1)}
					className="border bg-gray-950 px-4 text-center text-xl text-white"
				>
					-
				</button>
			</div>

			{/* TODO - test */}
			{counter % 2 === 0 && children}
		</div>
	);
};
