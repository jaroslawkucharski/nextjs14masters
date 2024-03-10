import { Shirt } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const EmptyView = async () => {
	const t = await getTranslations("EmptyCart");

	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<Shirt className="h-28 w-28 text-slate-500" />

			<p className="my-2 text-2xl">{t("title")}</p>

			<Link
				href={{ pathname: "/" }}
				className="text-sm uppercase hover:underline"
			>
				{t("back")}
			</Link>
		</div>
	);
};
