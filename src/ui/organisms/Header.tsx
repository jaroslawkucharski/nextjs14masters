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
	<header className="static z-10 flex h-fit w-full flex-col justify-center gap-12 border-b bg-white px-12 py-4 max-lg:justify-between lg:fixed lg:flex-row">
		<Link href="/" className="self-center">
			<Logo />
		</Link>

		<Navigation navigation={navigation} />
	</header>
);
