import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: {
		category: string;
		name: string;
		price: number;
	};
};

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => (
	<div className="flex flex-col p-4">
		<h3 className="truncate text-sm font-semibold text-gray-950">
			{name.toLocaleUpperCase()}
		</h3>

		<p className="text-sm text-gray-500">
			<span className="sr-only">Kategoria:</span> {category}
		</p>

		<p className="text-md self-end pt-1 font-medium text-gray-900">
			<span className="sr-only">Cena:</span> {formatMoney(price)}
		</p>
	</div>
);
