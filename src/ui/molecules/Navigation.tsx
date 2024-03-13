import { type Route } from "next";
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
		<ul className="flex min-w-fit flex-col flex-nowrap items-center gap-2 self-center lg:flex-row lg:gap-10">
			{navigation.map(({ label, href, exact }) => (
				<li key={label}>
					<ActiveLink
						className="flex w-full items-start justify-center text-center text-[16px] font-light hover:text-gray-900"
						activeClassName="text-gray-950 font-medium"
						href={href as Route}
						exact={exact}
					>
						{label}
					</ActiveLink>
				</li>
			))}
		</ul>
	</nav>
);
