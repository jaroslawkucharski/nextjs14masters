"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent } from "react";

export const Sort = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSort = (event: FormEvent<HTMLSelectElement>) => {
		const sortBy = (event.target as HTMLSelectElement).value.toUpperCase();

		const [sort, by] = sortBy.split("-");

		router.push(`?sort=${sort}&by=${by}`);
	};

	return (
		<div className="relative">
			<select
				name="sort"
				id="sort"
				className="w-56 appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
				onChange={handleSort}
				value={`${searchParams.get("sort")}-${searchParams.get("by")}`.toLocaleLowerCase()}
			>
				<option>-- sort by --</option>

				<option value="name-asc">Name A-Z</option>

				<option value="name-desc">Name Z-A</option>

				<option value="price-asc" data-testid="sort-by-price">
					Price ascending
				</option>

				<option value="price-desc" data-testid="sort-by-price">
					Price descending
				</option>

				<option value="rating-asc" data-testid="sort-by-rating">
					Rating ascending
				</option>

				<option value="rating-desc" data-testid="sort-by-rating">
					Rating descending
				</option>
			</select>

			<ChevronDown className="absolute right-2 top-2.5 h-4 w-4" />
		</div>
	);
};
