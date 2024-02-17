import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const navigationLinks = [
	{
		label: "Home",
		href: "/",
		exact: true,
	},
	{
		label: "All",
		href: "/products",
	},
	{
		label: "T-Shirts",
		href: "/categories/t-shirts",
	},
	{
		label: "Hoodies",
		href: "/categories/hoodies",
	},
	{
		label: "Accessories",
		href: "/categories/accessories",
	},
];

export const Navigation = () => (
	<nav className="hidden h-fit flex-1 justify-between gap-8 self-center px-4 sm:flex">
		<ul className="hidden gap-8 px-4 sm:flex">
			{navigationLinks.map(({ label, href, exact }) => (
				<li key={label}>
					<ActiveLink href={href as Route} exact={exact}>
						{label}
					</ActiveLink>
				</li>
			))}
		</ul>

		<div className="relative">
			<ShoppingCart />

			<span className="absolute bottom-4 left-4 rounded-full bg-red-500 px-1 text-xs text-white">
				0
			</span>
		</div>
	</nav>
);
