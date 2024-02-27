import clsx from "clsx";
import { type Route } from "next";
import { ActiveLink } from "./ActiveLink";

type PaginationButtonType = {
	href: string;
	label: string | number;
	isDisabled?: boolean;
	isActive?: boolean;
};

export const PaginationButton = ({
	href,
	label,
	isDisabled,
	isActive,
}: PaginationButtonType) => (
	<li className="flex justify-center">
		<ActiveLink
			className={clsx(
				`h-8 w-8 rounded-md border border-gray-400 text-center text-lg text-gray-950 hover:bg-gray-100`,
				{
					["bg-gray-900 text-white"]: isActive,
				},
			)}
			activeClassName="bg-gray-900 hover:hover:bg-gray-800 text-white hover:text-white"
			disabledClassName="bg-gray-200"
			href={href as Route}
			isDisabled={isDisabled}
		>
			{label}
		</ActiveLink>
	</li>
);
