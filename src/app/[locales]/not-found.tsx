import { HeartCrack } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PATHS } from "@/constants";

export default async function NotFound() {
	const t = await getTranslations("NotFound");

	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<HeartCrack className="h-28 w-28 text-slate-500" />

			<p className="my-2 text-2xl">{t("title")}</p>

			<Link
				href={{ pathname: PATHS.HOME }}
				className="text-sm uppercase hover:underline"
			>
				{t("back")}
			</Link>
		</div>
	);
}
