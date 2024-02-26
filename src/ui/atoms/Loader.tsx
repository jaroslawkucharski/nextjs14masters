import clsx from "clsx";

type LoaderProps = {
	size?: "sm" | "lg";
};

export const Loader = ({ size = "lg" }: LoaderProps) => (
	<div
		className={clsx(
			"flex animate-spin items-center justify-center rounded-full border-gray-200 border-t-transparent",
			{
				["h-20 w-20 border-8"]: size === "lg",
				["h-5 w-5 border-2"]: size === "sm",
			},
		)}
		aria-busy="true"
	/>
);
