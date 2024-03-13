import { type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Sort } from "@/ui/molecules/Sort";

type PageHeadingProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	sort?: boolean;
};

export const PageHeading = async ({
	title,
	description,
	children,
	sort,
}: PageHeadingProps) => {
	const t = await getTranslations("Sort");

	return (
		<div className="w-full px-12 py-6 text-center sm:text-left">
			<div className="mx-auto flex w-full flex-col items-center justify-center gap-12 sm:flex-row sm:justify-between lg:max-w-7xl">
				{title && <h2 className="text-md">{title}</h2>}

				{sort && (
					<Sort
						i18n={{
							sortBy: t("sortby"),
							nameAsc: t("name-asc"),
							nameDesc: t("name-desc"),
							priceAsc: t("price-asc"),
							priceDesc: t("price-desc"),
							ratingAsc: t("rating-asc"),
							ratingDesc: t("rating-desc"),
						}}
					/>
				)}
			</div>

			<div className="mx-auto flex w-full flex-col items-center justify-center gap-12 sm:flex-row sm:justify-between lg:max-w-7xl">
				{description && <p className="text-sm text-gray-500">{description}</p>}
			</div>

			<div className="mx-auto flex w-full flex-col items-center justify-center gap-12 sm:flex-row sm:justify-between lg:max-w-7xl">
				{children && <div className="mt-8">{children}</div>}
			</div>
		</div>
	);
};
