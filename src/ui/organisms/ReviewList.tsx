import { type Review } from "@/gql/graphql";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";

type ReviewListProps = {
	reviews: Review[];
	productId: string;
};

export const ReviewList = async ({ reviews }: ReviewListProps) => (
	<div>
		{reviews
			.map((review) => <ReviewListItem key={review.id} review={review} />)
			.reverse()}
	</div>
);
