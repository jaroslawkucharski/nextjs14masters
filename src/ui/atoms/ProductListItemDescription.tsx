import { Star } from "lucide-react";
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

		<p className="text-md flex w-full justify-between self-end pt-1 font-medium text-gray-900">
			<span className="sr-only">Rating:</span>

			<span className="flex gap-2">
				<span className="self-center text-xs">4.7 / 5</span>
				<span className="flex justify-end self-center">
					<Star className="h-4 w-4 fill-current text-yellow-400" />

					<Star className="h-4 w-4 fill-current text-yellow-400" />

					<Star className="h-4 w-4 fill-current text-yellow-400" />
				</span>
			</span>

			<span className="sr-only">Price:</span>

			{formatMoney(price)}
		</p>
	</div>
);
