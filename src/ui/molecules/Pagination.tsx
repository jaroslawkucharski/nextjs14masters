import { PaginationButton } from "../atoms/PaginationButton";
import { AMOUNT_OF_PRODUCTS } from "@/constants";

type PaginationType = {
	totalItems: number;
	currentPage: number;
};

export const Pagination = ({ totalItems, currentPage }: PaginationType) => {
	const numOfPages = Math.ceil(totalItems / AMOUNT_OF_PRODUCTS);
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
	const prevIsDisabled = currentPage <= 1;
	const nextIsDisabled = currentPage >= numOfPages;

	return (
		numOfPages > 1 && (
			<nav>
				<ul
					className="mt-20 flex w-full justify-center gap-2"
					aria-label="pagination"
				>
					<PaginationButton
						label="<"
						href={`/products/${currentPage - 1}`}
						isDisabled={prevIsDisabled}
					/>

					{pages.map((page) => (
						<PaginationButton
							key={page}
							label={page}
							href={`/products/${page}`}
							isActive={page === currentPage}
						/>
					))}

					<PaginationButton
						label=">"
						href={`/products/${currentPage + 1}`}
						isDisabled={nextIsDisabled}
					/>
				</ul>
			</nav>
		)
	);
};
