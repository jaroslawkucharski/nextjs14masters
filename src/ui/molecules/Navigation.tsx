import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Navigation = () => (
	<nav className="hidden h-fit flex-1 gap-8 self-center px-4 sm:flex">
		<ActiveLink href="/" exact>
			Home
		</ActiveLink>

		<ActiveLink href="/products">All</ActiveLink>

		{/* TODO - fake links */}
		<p className="text-lg text-gray-500">Jewelery</p>

		<p className="text-lg text-gray-500">Outdoors</p>

		<p className="text-lg text-red-600">Sales</p>
	</nav>
);
