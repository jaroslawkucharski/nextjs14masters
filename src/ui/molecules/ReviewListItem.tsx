import { getLocale } from "next-intl/server";
import { Rating } from "@/ui/atoms/Rating";
import { type Review } from "@/gql/graphql";
import { formatDate } from "@/utils/intl";

type ReviewListItemProps = {
	review: Review;
	email?: string;
};

export const ReviewListItem = async ({ review }: ReviewListItemProps) => {
	const lang = await getLocale();

	return (
		<article key={review.id} className="border-b py-8">
			<div
				key={review.id}
				className="mb-6 flex flex-wrap items-center justify-between gap-4"
			>
				<div className="w-72">
					<p className="text-sm">{review.author}</p>

					<p className="text-xs font-light">{review.email}</p>
				</div>

				<Rating rating={review.rating} />

				<p className="text-sm font-light">
					{formatDate({
						date: review.createdAt as string,
						lang,
						style: "short",
					})}
				</p>
			</div>

			<div>
				<h3 className="pb-2 font-semibold">{review.title}</h3>
				<p className="text-sm text-gray-600">{review.description}</p>
			</div>
		</article>
	);
};
