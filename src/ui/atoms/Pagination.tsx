import { ActiveLink } from "./ActiveLink";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

export const Pagination = ({ length }: { length: number }) => {
	const numOfPages = Math.ceil(length / Number(AMOUNT_OF_PRODUCTS));

	return (
		<nav>
			<ul className="mt-20 flex w-full justify-center" aria-label="pagination">
				{Array.from({ length: numOfPages }, (_, index) => index + 1).map(
					(page, pageIndex) => (
						<li key={page} className="flex justify-center">
							<ActiveLink className="text-lg" href={`/products/${page}`}>
								{page}
							</ActiveLink>

							{pageIndex !== numOfPages - 1 && <span className="mx-4">|</span>}
						</li>
					),
				)}
			</ul>
		</nav>
	);
};
