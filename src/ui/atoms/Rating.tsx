import clsx from "clsx";
import { Star } from "lucide-react";

type RatingProps = {
	rating?: number | null;
};

export const Rating = ({ rating = 0 }: RatingProps) => (
	<span className="flex gap-2">
		<span className="self-center text-xs" data-testid="product-rating">
			{`${rating?.toFixed(1)} / 5`}
		</span>

		<span className="flex justify-end self-center" data-testid="product-rating">
			{[...Array<number>(5)].map((_, index) => (
				<Star
					key={index}
					className={clsx("h-4 w-4 text-gray-400", {
						["fill-current text-yellow-400"]:
							index < Math.round(rating as number),
					})}
				/>
			))}
		</span>
	</span>
);
