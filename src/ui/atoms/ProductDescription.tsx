import { type ProductItemType } from "@/ui/types";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductDescription = ({
	product: { name, category, price, description },
}: ProductListItemDescriptionProps) => (
	<div className="flex flex-col p-4">
		<h1 className="text-2xl font-medium text-gray-950 lg:text-4xl">{name}</h1>

		<p className="my-2 pt-1 text-2xl font-semibold text-gray-900 lg:my-4 lg:text-4xl">
			<span className="sr-only">Price:</span>

			{formatMoney(price)}
		</p>

		<p className="text-md my-4 pt-1 text-gray-900 lg:text-xl">
			<span className="sr-only">Description:</span>

			{description}
		</p>

		<p className="text-lg text-gray-500">
			<span className="sr-only">Category:</span>

			{category}
		</p>
	</div>
);
