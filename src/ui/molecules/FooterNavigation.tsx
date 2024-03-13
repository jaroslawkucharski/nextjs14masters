import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

type NavigationProps = {
	navigation: {
		label: string;
		items: {
			label: string;
			href: string;
			exact?: boolean;
		}[];
	}[];
};

export const FooterNavigation = ({ navigation }: NavigationProps) => (
	<nav className="mr-16 flex gap-8 sm:gap-24">
		{navigation.map(({ label, items }) => (
			<div key={label}>
				<p className="mb-2 text-white">{label}</p>

				<ul className="flex min-w-fit flex-col flex-nowrap items-start gap-1 self-center">
					{items.map(({ label, href, exact }) => (
						<li key={label}>
							<ActiveLink
								className="flex w-full items-start justify-center text-sm font-light text-gray-300 hover:text-gray-200"
								activeClassName="font-regular text-gray-300"
								href={href as Route}
								exact={exact}
							>
								{label}
							</ActiveLink>
						</li>
					))}
				</ul>
			</div>
		))}
	</nav>
);
