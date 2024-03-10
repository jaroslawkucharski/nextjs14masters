"use client";

import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type LanguageSwitcherType = {
	lang: string;
};

export const LanguageSwitcher = ({ lang }: LanguageSwitcherType) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleChangeLanguage = () => {
		router.replace(`/${lang === "pl" ? "en" : "pl"}${pathname}/`);
	};

	return (
		<div
			onClick={handleChangeLanguage}
			className="flex cursor-pointer items-center gap-1 self-center font-bold"
		>
			{lang.toLocaleUpperCase()} <Globe className="h-5 w-5" />
		</div>
	);
};
