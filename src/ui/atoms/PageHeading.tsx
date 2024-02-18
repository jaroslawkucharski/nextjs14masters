import { type ReactNode } from "react";

export const PageHeading = ({ children }: { children: ReactNode }) => (
	<div className="bg-slate-100 px-36 py-10">
		<h2 className="text-center text-lg md:text-left lg:text-left">
			{children}
		</h2>
	</div>
);
