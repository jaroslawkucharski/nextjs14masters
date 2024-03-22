"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent } from "react";

export const Sort = () => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSort = (event: FormEvent<HTMLSelectElement>) => {
		const sortBy = (event.target as HTMLSelectElement).value.toUpperCase();

		const [order, dir] = sortBy.split("-");

		router.push(`?order=${order}&dir=${dir}`);
	};

	return (
		<div className="relative w-fit">
			<select
				name="sort"
				id="sort"
				className="w-56 appearance-none self-start rounded-md border-0 bg-gray-50 px-4 py-2 text-sm text-gray-500 ring-1 ring-inset ring-gray-200 placeholder:text-gray-500 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
				onChange={handleSort}
				value={`${searchParams.get("order")}-${searchParams.get("dir")}`.toLocaleLowerCase()}
			>
				<option>-- {t("word-sortby")} --</option>

				<option value="name-asc">{t("word-name-asc")}</option>

				<option value="name-desc">{t("word-name-desc")}</option>

				<option value="price-asc" data-testid="sort-by-price">
					{t("word-price-asc")}
				</option>

				<option value="price-desc" data-testid="sort-by-price">
					{t("word-price-desc")}
				</option>

				<option value="rating-asc" data-testid="sort-by-rating">
					{t("word-rating-asc")}
				</option>

				<option value="rating-desc" data-testid="sort-by-rating">
					{t("word-rating-desc")}
				</option>
			</select>

			<ChevronDown className="absolute right-2 top-2.5 h-4 w-4" />
		</div>
	);
};
