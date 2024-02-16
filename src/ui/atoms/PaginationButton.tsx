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
				`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-900 hover:text-white`,
				{
					["bg-gray-900 text-white"]: isActive,
				},
			)}
			activeClassName="bg-gray-900 text-white"
			disabledClassName="bg-gray-100"
			href={href as Route}
			isDisabled={isDisabled}
		>
			{label}
		</ActiveLink>
	</li>
);
