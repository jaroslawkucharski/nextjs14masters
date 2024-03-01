import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader } from "./Loader";

type ButtonProps = {
	className?: string;
	children: ReactNode;
	variant?: "primary" | "square" | "remove";
	isLoading?: boolean;
};

export const Button = ({
	className,
	children,
	variant = "primary",
	isLoading,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={clsx(
			"flex justify-center",
			{
				["w-full rounded-md border bg-gray-900 px-8 py-3 text-white hover:bg-gray-800 disabled:bg-gray-500"]:
					variant === "primary",
				["mb-8 flex items-center gap-1 text-sm text-red-500 disabled:text-gray-500"]:
					variant === "remove",
				["h-8 w-8 rounded-md border border-gray-400 text-center text-lg text-gray-950 hover:bg-gray-100 disabled:bg-gray-200"]:
					variant === "square",
				["cursor-wait"]: isLoading,
			},
			className,
		)}
		{...props}
	>
		{isLoading ? <Loader size="sm" /> : children}
	</button>
);
