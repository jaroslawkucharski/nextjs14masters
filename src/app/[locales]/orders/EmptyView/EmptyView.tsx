import { ListOrdered } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PATHS } from "@/constants";

export const EmptyView = async () => {
	const t = await getTranslations();

	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<ListOrdered className="h-28 w-28 text-slate-500" />

			<p className="my-2 text-2xl">{t("orders-empty-title")}</p>

			<Link
				href={{ pathname: PATHS.PRODUCTS }}
				className="text-sm uppercase hover:underline"
			>
				{t("orders-empty-link")}
			</Link>
		</div>
	);
};
