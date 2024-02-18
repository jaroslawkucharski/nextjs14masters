import { type ReactNode } from "react";

type PageHeadingProps = {
	children: ReactNode;
};

export const PageHeading = ({ children }: PageHeadingProps) => (
	<div className="bg-slate-100 px-36 py-10">
		<h2 className="text-center text-lg md:text-left lg:text-left">
			{children}
		</h2>
	</div>
);
