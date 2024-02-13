import { ActiveLink } from "./ActiveLink";

export const Pagination = ({ length }: { length: number }) => {
	const numOfPages = Math.ceil(length / 20);

	console.log("numOfPages: ", numOfPages);

	return (
		<ul
			className="mt-20 flex w-full justify-center gap-4"
			aria-label="pagination"
		>
			{Array.from({ length: numOfPages }, (_, index) => index + 1).map(
				(page, pageIndex) => (
					<li key={page}>
						<ActiveLink className="text-lg" href={`/products/${page}`}>
							{page}
						</ActiveLink>

						{pageIndex !== numOfPages - 1 && <span>|</span>}
					</li>
				),
			)}
		</ul>
	);
};
