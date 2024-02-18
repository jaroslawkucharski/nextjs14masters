import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

type NavigationProps = {
	navigation: {
		label: string;
		href: string;
		exact?: boolean;
	}[];
};

export const Navigation = ({ navigation }: NavigationProps) => (
	<nav className="flex h-fit w-full flex-1 flex-col items-center justify-center gap-8 self-center px-4 lg:flex-row lg:justify-between">
		<ul className="flex flex-col flex-wrap items-center gap-4 lg:flex-row lg:gap-8">
			{navigation.map(({ label, href, exact }) => (
				<li key={label}>
					<ActiveLink href={href as Route} exact={exact}>
						{label}
					</ActiveLink>
				</li>
			))}
		</ul>

		<div className="flex flex-1 flex-col justify-end gap-8 lg:flex-row">
			<input
				className="w-full min-w-64 max-w-64 self-center rounded-md border-0 bg-slate-50 py-2 pl-4 pr-4 text-sm text-slate-800 ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 lg:min-w-40"
				placeholder="Search"
				type="search"
				name="search"
			/>

			<div className="relative self-center">
				<ShoppingCart />

				<span className="absolute bottom-4 left-4 rounded-full bg-red-500 px-1 text-xs text-white">
					0
				</span>
			</div>
		</div>
	</nav>
);
