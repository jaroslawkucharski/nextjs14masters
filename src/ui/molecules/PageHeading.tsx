import { type ReactNode } from "react";
import { Sort } from "@/ui/molecules/Sort";

type PageHeadingProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	sort?: boolean;
};

export const PageHeading = ({
	title,
	description,
	children,
	sort,
}: PageHeadingProps) => (
	<div className="bg-slate-50 px-8 pb-10 text-center sm:px-36 lg:text-left">
		<div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between">
			{title && <h2 className="text-2xl font-semibold">{title}</h2>}

			{sort && <Sort />}
		</div>

		{description && <p className="text-gray-600">{description}</p>}

		{children && <div className="mt-8">{children}</div>}
	</div>
);
