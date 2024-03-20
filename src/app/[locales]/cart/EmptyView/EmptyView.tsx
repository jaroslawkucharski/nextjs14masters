import { Shirt } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PATHS } from "@/constants";
import { PageHeading } from "@/ui/molecules/PageHeading";

export const EmptyView = async () => {
	const t = await getTranslations();

	return (
		<>
			<PageHeading title={t("cart-title")} />

			<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
				<Shirt className="h-28 w-28 text-slate-500" />

				<p className="my-2 text-2xl">{t("empty-card-title")}</p>

				<Link
					href={{ pathname: PATHS.HOME }}
					className="text-sm uppercase hover:underline"
				>
					{t("empty-card-link")}
				</Link>
			</div>
		</>
	);
};
