import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Navigation = () => (
	<nav>
		<ul className="flex h-fit content-center justify-center gap-4 px-4">
			<li>
				<ActiveLink href="/" exact>
					Home
				</ActiveLink>
			</li>

			<li>
				<ActiveLink href="/products">All</ActiveLink>
			</li>
		</ul>
	</nav>
);
