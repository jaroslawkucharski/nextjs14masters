import { getLocale, getTranslations } from "next-intl/server";
import { Rating } from "./Rating";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/intl";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductDescription = async ({
	product: { name, categories, price, description, rating },
}: ProductListItemDescriptionProps) => {
	const t = await getTranslations();
	const lang = await getLocale();

	return (
		<div className="flex flex-col p-4">
			<h1 className="text-2xl font-medium text-gray-950 lg:text-4xl">{name}</h1>

			<p className="my-2 pt-1 text-2xl font-semibold text-gray-900 lg:my-4 lg:text-4xl">
				<span className="sr-only">{t("word-price")}:</span>

				{formatMoney(price, lang)}
			</p>

			<Rating rating={rating} />

			<p className="text-md my-4 pt-1 text-gray-900 lg:text-lg">
				<span className="sr-only">{t("word-description")}:</span>

				{description}
			</p>

			<p className="text-lg text-gray-500">
				<span className="sr-only">{t("word-category")}:</span>

				{t(`word-${categories[0]?.name.toLocaleLowerCase()}`) || ""}
			</p>
		</div>
	);
};
