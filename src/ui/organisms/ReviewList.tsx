import { type Review } from "@/gql/graphql";
import { AddReviewForm } from "@/ui/molecules/AddReviewForm";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";

type ReviewListProps = {
	reviews: Review[];
	productId: string;
};

export const ReviewList = ({ reviews, productId }: ReviewListProps) => (
	<section className="mx-auto max-w-md sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
		<h2 className="mb-6 text-center text-xl font-semibold sm:text-left md:text-left lg:text-left">
			Reviews
		</h2>

		<div className="mx-auto flex max-w-md flex-col gap-12 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl xl:flex-row">
			<AddReviewForm productId={productId} />

			<div>
				{reviews
					.map((review) => <ReviewListItem key={review.id} review={review} />)
					.reverse()}
			</div>
		</div>
	</section>
);
