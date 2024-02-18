import Link from "next/link";
import { Navigation } from "@/ui/molecules/Navigation";
import { Logo } from "@/ui/atoms/Logo";

type HeaderProps = {
	navigation: {
		label: string;
		href: string;
		exact?: boolean;
	}[];
};

export const Header = ({ navigation }: HeaderProps) => (
	<header className="flex h-fit flex-col justify-center gap-12 border-b-2 border-gray-500 px-12 py-4 lg:flex-row lg:justify-between">
		<Link href="/" className="self-center">
			<Logo />
		</Link>

		<Navigation navigation={navigation} />
	</header>
);
