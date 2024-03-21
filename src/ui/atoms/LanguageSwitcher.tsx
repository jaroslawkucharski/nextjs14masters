"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LANGUAGES, type LanguagesType } from "@/constants";

export const LanguageSwitcher = () => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();

	const handleChangeLanguage = (lang: LanguagesType) =>
		router.replace(`/${lang}/${pathname}`);

	return (
		<div className="flex min-w-fit flex-col flex-nowrap items-start gap-1 self-center">
			<p
				className="flex w-full cursor-pointer items-center justify-start gap-1 text-sm font-light text-gray-300 hover:!text-gray-200"
				onClick={() => handleChangeLanguage(LANGUAGES.EN)}
			>
				<Image
					src="/images/en.png"
					alt={t("word-english")}
					width={20}
					height={12.5}
				/>

				{t("word-english")}
			</p>

			<p
				className="flex w-full cursor-pointer items-center justify-start gap-1 text-sm font-light text-gray-300 hover:!text-gray-200"
				onClick={() => handleChangeLanguage(LANGUAGES.PL)}
			>
				<Image
					src="/images/pl.png"
					alt={t("word-polish")}
					width={20}
					height={12.5}
				/>

				{t("word-polish")}
			</p>
		</div>
	);
};
