import { type Route } from "next";
import Image from "next/image";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

type NavigationProps = {
	navigation: {
		label: string;
		items: {
			label: string;
			href: string;
			exact?: boolean;
			img?: string;
		}[];
	}[];
};

export const FooterNavigation = ({ navigation }: NavigationProps) => (
	<nav className="mr-0 flex flex-col gap-8 sm:mr-16 sm:flex-row sm:gap-24">
		{navigation.map(({ label, items }) => (
			<div key={label}>
				<p className="mb-2 text-white">{label}</p>

				<ul className="flex min-w-fit flex-col flex-nowrap items-start gap-1 self-center">
					{items.map(({ label, href, exact, img }) => (
						<li key={label}>
							<ActiveLink
								className="flex w-full items-center justify-center gap-1 text-sm font-light text-gray-300 hover:!text-gray-200"
								activeClassName="font-regular !text-gray-300"
								href={href as Route}
								exact={exact}
							>
								{img && <Image src={img} alt={label} width={20} height={20} />}

								{label}
							</ActiveLink>
						</li>
					))}
				</ul>
			</div>
		))}
	</nav>
);
