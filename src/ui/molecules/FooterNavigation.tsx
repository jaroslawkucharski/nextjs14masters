import { type Route } from "next";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../atoms/LanguageSwitcher";
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

export const FooterNavigation = ({ navigation }: NavigationProps) => {
	const t = useTranslations();

	return (
		<nav className="mr-0 flex flex-col gap-8 sm:mr-16 sm:flex-row sm:gap-24">
			{navigation.map(({ label, items }) => (
				<div key={label}>
					<p className="mb-2 text-white">{label}</p>

					<ul className="flex min-w-fit flex-col flex-nowrap items-start gap-1 self-center">
						{items.map(({ label, href, exact }) => (
							<li key={label}>
								<ActiveLink
									className="flex w-full items-center justify-center gap-1 text-sm font-light text-gray-300 hover:!text-gray-200"
									activeClassName="font-regular !text-gray-300"
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

			<div>
				<p className="mb-2 text-white">{t("word-language")}</p>

				<Suspense>
					<LanguageSwitcher />
				</Suspense>
			</div>
		</nav>
	);
};
