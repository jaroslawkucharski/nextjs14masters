import { PaginationButton } from "../atoms/PaginationButton";
import { getNumOfPages } from "@/helpers";
import { DEFAULT_AMOUNT_OF_PRODUCTS } from "@/constants";

type PaginationType = {
	totalItems: number;
	currentPage: number;
	path: string;
	limit?: number;
};

export const Pagination = ({
	totalItems,
	currentPage,
	path,
	limit = DEFAULT_AMOUNT_OF_PRODUCTS,
}: PaginationType) => {
	const numOfPages = getNumOfPages(totalItems, limit);

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
						href={`/${path}/${currentPage - 1}`}
						isDisabled={prevIsDisabled}
					/>

					{pages.map((page) => (
						<PaginationButton
							key={page}
							label={page}
							href={`/${path}/${page}`}
							isActive={page === currentPage}
						/>
					))}

					<PaginationButton
						label=">"
						href={`/${path}/${currentPage + 1}`}
						isDisabled={nextIsDisabled}
					/>
				</ul>
			</nav>
		)
	);
};
