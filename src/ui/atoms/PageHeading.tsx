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
	<div className="bg-slate-100 px-36 py-10">
		{title && (
			<h2 className="text-lg font-semibold md:text-left lg:text-left">
				{title}
			</h2>
		)}

		{description && <p className="text-gray-600">{description}</p>}

		{children}
	</div>
);
