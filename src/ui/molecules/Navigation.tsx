import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Navigation = () => (
	<nav className="flex h-fit content-center justify-center gap-4 px-4">
		<ActiveLink href="/">Home</ActiveLink>
		<ActiveLink href="/products">All</ActiveLink>
	</nav>
);
