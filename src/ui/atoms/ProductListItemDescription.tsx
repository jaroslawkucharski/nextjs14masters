import { Star } from "lucide-react";
import clsx from "clsx";
import { formatMoney } from "@/utils";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price, rating },
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
				<span className="self-center text-xs" data-testid="product-rating">
					{`${rating?.toFixed(1)} / 5`}
				</span>

				<span
					className="flex justify-end self-center"
					data-testid="product-rating"
				>
					{[...Array<number>(5)].map((_, index) => (
						<Star
							key={index}
							className={clsx("h-4 w-4 text-gray-400", {
								["fill-current text-yellow-400"]:
									index < Math.round(rating || 0),
							})}
						/>
					))}
				</span>
			</span>

			<span className="sr-only">Price:</span>

			<span data-testid="product-price">{formatMoney(price)}</span>
		</p>
	</div>
);
