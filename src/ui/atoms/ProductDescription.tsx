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
	const t = await getTranslations("Product");
	const lang = await getLocale();

	return (
		<div className="flex flex-col p-4">
			<h1 className="flex items-center justify-between text-2xl font-medium text-gray-950 lg:text-4xl">
				{name}

				<Rating rating={rating} />
			</h1>

			<p className="my-2 pt-1 text-2xl font-semibold text-gray-900 lg:my-4 lg:text-4xl">
				<span className="sr-only">Price:</span>

				{formatMoney(price, lang)}
			</p>

			<p className="text-md my-4 pt-1 text-gray-900 lg:text-lg">
				<span className="sr-only">Description:</span>

				{description}
			</p>

			<p className="text-lg text-gray-500">
				<span className="sr-only">Category:</span>

				{t(categories[0]?.name.toLocaleLowerCase()) || ""}
			</p>
		</div>
	);
};
