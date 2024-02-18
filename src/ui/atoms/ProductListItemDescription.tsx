import { formatMoney } from "@/utils";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => (
	<div className="flex flex-col p-4">
		<h3 className="truncate text-sm font-semibold text-gray-950">
			{name.toLocaleUpperCase()}
		</h3>

		<p className="text-sm text-gray-500">
			<span className="sr-only">Category:</span>

			{categories[0]?.name || ""}
		</p>

		<p className="text-md self-end pt-1 font-medium text-gray-900">
			<span className="sr-only">Price:</span>

			{formatMoney(price)}
		</p>
	</div>
);
