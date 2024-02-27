import clsx from "clsx";

type LoaderProps = {
	size?: "sm" | "lg";
};

export const Loader = ({ size = "lg" }: LoaderProps) => (
	<div
		className={clsx(
			"flex animate-spin items-center justify-center rounded-full border-t-transparent",
			{
				["h-20 w-20 border-8 border-gray-500"]: size === "lg",
				["h-5 w-5 border-2 border-gray-200"]: size === "sm",
			},
		)}
		aria-busy="true"
	/>
);
