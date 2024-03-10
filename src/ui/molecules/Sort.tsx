"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent } from "react";

type SortProps = {
	i18n: {
		sortBy: string;
		nameAsc: string;
		nameDesc: string;
		priceAsc: string;
		priceDesc: string;
		ratingAsc: string;
		ratingDesc: string;
	};
};

export const Sort = ({ i18n }: SortProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSort = (event: FormEvent<HTMLSelectElement>) => {
		const sortBy = (event.target as HTMLSelectElement).value.toUpperCase();

		const [order, dir] = sortBy.split("-");

		router.push(`?order=${order}&dir=${dir}`);
	};

	return (
		<div className="relative">
			<select
				name="sort"
				id="sort"
				className="w-56 appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
				onChange={handleSort}
				value={`${searchParams.get("order")}-${searchParams.get("dir")}`.toLocaleLowerCase()}
			>
				<option>-- {i18n.sortBy} --</option>

				<option value="name-asc">{i18n.nameAsc}</option>

				<option value="name-desc">{i18n.nameDesc}</option>

				<option value="price-asc" data-testid="sort-by-price">
					{i18n.priceAsc}
				</option>

				<option value="price-desc" data-testid="sort-by-price">
					{i18n.priceDesc}
				</option>

				<option value="rating-asc" data-testid="sort-by-rating">
					{i18n.ratingAsc}
				</option>

				<option value="rating-desc" data-testid="sort-by-rating">
					{i18n.ratingDesc}
				</option>
			</select>

			<ChevronDown className="absolute right-2 top-2.5 h-4 w-4" />
		</div>
	);
};
