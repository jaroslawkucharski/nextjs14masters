import { getLocale, getTranslations } from "next-intl/server";
import { Rating } from "./Rating";
import { formatMoney } from "@/utils/intl";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = async ({
	product: { name, categories, price, rating },
}: ProductListItemDescriptionProps) => {
	const t = await getTranslations();
	const lang = await getLocale();

	return (
		<div className="flex flex-col p-4">
			<h3 className="truncate text-sm font-semibold text-gray-950">
				{name.toLocaleUpperCase()}
			</h3>

			<p className="text-sm text-gray-500">
				<span className="sr-only">{t("word-category")}:</span>
				{t(`word-${categories[0]?.name.toLocaleLowerCase()}`) || ""}
			</p>

			<p className="text-md flex w-full justify-between self-end pt-1 font-medium text-gray-900">
				<span className="sr-only">{t("word-rating")}:</span>

				<Rating rating={rating} />

				<span className="sr-only">{t("word-price")}:</span>

				<span data-testid="product-price">{formatMoney(price, lang)}</span>
			</p>
		</div>
	);
};
