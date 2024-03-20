import { type Metadata } from "next";

import { SearchX } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { getProductList } from "@/api/products/getProductList";
import { ProductsList } from "@/ui/organisms/ProductList";
import { PATHS } from "@/constants";

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations();

	return {
		title: t("search-title"),
		description: t("search-description"),
	};
};

export type SearchPageType = {
	searchParams: {
		query: string;
	};
};

export default async function SearchPage({ searchParams }: SearchPageType) {
	const t = await getTranslations();

	const data = searchParams.query
		? await getProductList({
				search: searchParams.query,
			})
		: null;

	const products = data?.products;

	return (
		<>
			<PageHeading
				title={t("search-results", { query: searchParams.query ?? "" })}
				description={t("search-found-results", {
					results: products?.length ?? 0,
				})}
			/>

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{products?.length ? (
					<ProductsList products={products} />
				) : (
					<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
						<SearchX className="h-28 w-28 text-slate-500" />

						<p className="my-2 text-2xl">{t("search-no-results")}</p>

						<Link
							href={{ pathname: PATHS.HOME }}
							className="text-sm uppercase hover:underline"
						>
							{t("search-link")}
						</Link>
					</div>
				)}
			</section>
		</>
	);
}
