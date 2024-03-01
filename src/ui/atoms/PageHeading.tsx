import { type ReactNode } from "react";

type PageHeadingProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
};

export const PageHeading = ({
	title,
	description,
	children,
}: PageHeadingProps) => (
	<div className="bg-slate-50 px-2 pb-10 pt-10 text-center sm:px-36 lg:pt-28 lg:text-left">
		{title && <h2 className="text-2xl font-semibold">{title}</h2>}

		{description && <p className="text-gray-600">{description}</p>}

		{children && <div className="mt-8">{children}</div>}
	</div>
);
