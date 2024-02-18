import Link from "next/link";
import { Logo } from "@/ui/atoms/Logo";

import { Navigation } from "@/ui/molecules/Navigation";

type HeaderProps = {
	navigation: {
		label: string;
		href: string;
		exact?: boolean;
	}[];
};

export const Header = ({ navigation }: HeaderProps) => (
	<header className="flex h-fit justify-center gap-12 border-b-2 border-gray-500 px-12 py-4 sm:justify-between">
		<Link href="/">
			<Logo />
		</Link>

		<Navigation navigation={navigation} />
	</header>
);
