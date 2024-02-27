import { type Route } from "next";
import { Suspense } from "react";
import { Cart } from "@/ui/atoms/Cart";
import { Searcher } from "@/ui/atoms/Searcher";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

type NavigationProps = {
	navigation: {
		label: string;
		href: string;
		exact?: boolean;
	}[];
};

export const Navigation = ({ navigation }: NavigationProps) => (
	<nav className="flex w-full flex-1 flex-col items-center justify-center gap-8 self-center px-4 lg:flex-row lg:justify-between">
		<ul className="flex min-w-fit flex-col flex-nowrap items-center gap-4 self-center lg:flex-row lg:gap-8">
			{navigation.map(({ label, href, exact }) => (
				<li key={label}>
					<ActiveLink
						className="flex w-full items-start justify-center border-b-2 text-center hover:border-gray-900 hover:text-slate-700"
						activeClassName="border-gray-900"
						href={href as Route}
						exact={exact}
					>
						{label}
					</ActiveLink>
				</li>
			))}
		</ul>

		<div className="flex flex-1 flex-col justify-end gap-8 lg:flex-row">
			<Suspense>
				<Searcher />
			</Suspense>

			<Cart />
		</div>
	</nav>
);
