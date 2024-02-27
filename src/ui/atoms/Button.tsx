import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader } from "./Loader";

type ButtonProps = {
	children: ReactNode;
	variant?: "primary" | "square" | "remove";
	isLoading?: boolean;
};

export const Button = ({
	children,
	variant = "primary",
	isLoading,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={clsx("flex justify-center disabled:bg-gray-500", {
			["w-full rounded-md border bg-gray-900 px-8 py-3 text-white hover:bg-gray-800"]:
				variant === "primary",
			["mb-8 flex items-center gap-1 text-sm text-red-500"]:
				variant === "remove",
			["h-8 w-8 rounded-md border border-gray-400 text-center text-lg text-gray-950"]:
				variant === "square",
			["cursor-wait"]: isLoading,
		})}
		{...props}
	>
		{isLoading ? <Loader size="sm" /> : children}
	</button>
);
