import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	variant?: "primary" | "remove";
};

export const Button = ({
	children,
	variant = "primary",
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={clsx({
			["w-full rounded-md border bg-gray-900 px-8 py-3 text-white hover:bg-gray-800"]:
				variant === "primary",
			["mb-8 flex items-center gap-1 text-red-500"]: variant === "remove",
		})}
		{...props}
	>
		{children}
	</button>
);
