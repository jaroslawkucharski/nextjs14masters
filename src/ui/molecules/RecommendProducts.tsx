"use client";

import { RelatedProducts } from "@algolia/recommend-react";
import recommend, { type RecommendClient } from "@algolia/recommend";
import Link from "next/link";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { Rating } from "@/ui/atoms/Rating";
import { formatMoney } from "@/utils/intl";

type AlgoliaProduct = {
	objectID: string;
	name: string;
	description?: string;
	price: number;
	rating?: number;
	slug: string;
	_score?: number;
	categories: { name: string }[];
	images?: { url: string }[];
};

type RelatedItemProps = {
	item: AlgoliaProduct;
};

type RecommendProductsProps = {
	productId: string;
	lang: string;
};

const RelatedItem = ({ item }: RelatedItemProps, lang: string) => {
	return (
		<Link prefetch href={`/product/${item.slug}-${item.objectID}`}>
			<article className="bg-white transition-transform hover:scale-105">
				{item.images && item.images[0]?.url && (
					<ProductListItemCoverImage
						src={item.images[0]?.url}
						alt={item.name}
					/>
				)}

				<div className="flex flex-col p-4">
					<h3 className="truncate text-sm font-semibold text-gray-950">
						{item.name.toLocaleUpperCase()}
					</h3>

					<p>{item._score}</p>

					<p className="text-md flex w-full justify-between self-end pt-1 font-medium text-gray-900">
						<Rating rating={item.rating || 0} />
						<span data-testid="product-price">
							{formatMoney(item.price, lang)}
						</span>
					</p>
				</div>
			</article>
		</Link>
	);
};

export const RecommendProducts = ({
	productId,
	lang,
}: RecommendProductsProps) => {
	const recommendClient: RecommendClient = recommend(
		process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
		process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
	);

	return (
		<RelatedProducts
			classNames={{
				list: "grid cursor-pointer grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
				title: "hidden",
			}}
			data-testid="products-list"
			recommendClient={recommendClient}
			indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}
			objectIDs={[productId]}
			itemComponent={(item: RelatedItemProps) => RelatedItem(item, lang)}
			maxRecommendations={4}
		/>
	);
};
