import Link from "next/link";
import { Logo } from "@/ui/atoms/Logo";

import { Navigation } from "@/ui/molecules/Navigation";

export const Header = () => (
	<header className="flex h-fit content-center justify-between p-6">
		<Link href="/">
			<Logo />
		</Link>

		<Navigation />
	</header>
);
