import { type Review } from "@/gql/graphql";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";

type ReviewListProps = {
	reviews: Review[];
	productId: string;
	email?: string;
};

export const ReviewList = async ({ reviews, email }: ReviewListProps) => (
	<div>
		{reviews
			.map((review) => (
				<ReviewListItem key={review.id} review={review} email={email} />
			))
			.reverse()}
	</div>
);
