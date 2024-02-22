"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export const Searcher = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSearch = useDebouncedCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;

			const params = new URLSearchParams(searchParams);

			if (value && value.length > 1) {
				params.set("query", value);
			} else {
				params.delete("query");
			}

			router.replace(`/search?${params.toString()}`);
		},
		500,
	);

	return (
		<input
			className="w-full min-w-64 max-w-64 self-start rounded-md border-0 bg-slate-50 py-2 pl-4 pr-4 text-sm text-slate-800 ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 lg:min-w-40"
			placeholder="Search"
			type="search"
			name="search"
			defaultValue={searchParams.get("query")?.toString()}
			onChange={handleSearch}
		/>
	);
};
