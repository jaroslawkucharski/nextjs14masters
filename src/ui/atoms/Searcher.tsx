"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

type SearcherProps = {
	i18n: {
		placecholder: string;
	};
};

export const Searcher = ({ i18n }: SearcherProps) => {
	const searchParams = useSearchParams();

	const router = useRouter();

	const handleSearch = useDebouncedCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;

			const params = new URLSearchParams(searchParams);

			if (!value) {
				// TODO
				return router.replace("/");
			}

			if (value && value.length > 1) {
				params.set("query", value);

				router.replace(`/search?${params.toString()}`);
			}

			return params.delete("query");
		},
		500,
	);

	return (
		<div className="relative self-center">
			<Search className="absolute left-2 top-2 h-5 w-5 text-slate-400" />

			<input
				className="w-64 min-w-64 appearance-none self-start rounded-md border-0 bg-white py-2 pl-8 pr-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
				placeholder={i18n.placecholder}
				type="search"
				name="search"
				defaultValue={searchParams.get("query")?.toString()}
				onChange={handleSearch}
			/>
		</div>
	);
};
