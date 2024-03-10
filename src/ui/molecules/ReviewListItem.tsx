import { getLocale, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Rating } from "../atoms/Rating";
import { type Review } from "@/gql/graphql";
import { formatDate } from "@/utils/intl";

type ReviewListItemProps = {
	review: Review;
	email?: string;
};

export const ReviewListItem = async ({
	review,
	email,
}: ReviewListItemProps) => {
	const lang = await getLocale();
	const t = await getTranslations("Product");

	return (
		<article key={review.id} className="border-b py-8">
			<div
				key={review.id}
				className="mb-6 flex flex-wrap items-center justify-between gap-4"
			>
				<div className="w-72">
					<p className="text-sm">{review.author}</p>

					<p className="text-xs font-light">{review.email}</p>

					{email === review.email && (
						<p className="mt-1 flex w-fit items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-[10px] text-white">
							<Check className="h-3 w-3" />
							{t("account-verified")}
						</p>
					)}
				</div>

				<Rating rating={review.rating} />

				<p className="text-sm font-light">
					{formatDate(review.createdAt as string, lang, "short")}
				</p>
			</div>

			<div>
				<h3 className="pb-2 font-semibold">{review.title}</h3>
				<p className="text-sm text-gray-600">{review.description}</p>
			</div>
		</article>
	);
};
