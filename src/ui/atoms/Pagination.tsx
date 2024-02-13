import { type UrlObject } from "url";
import { ActiveLink } from "./ActiveLink";

export const Pagination = ({ length }: { length: number }) => {
	const numOfPages = Math.ceil(length / 20);

	console.log("numOfPages: ", numOfPages);

	return (
		<nav>
			<ul className="mt-20 flex w-full justify-center" aria-label="pagination">
				{Array.from({ length: numOfPages }, (_, index) => index + 1).map(
					(page, pageIndex) => (
						<li key={page} className="flex justify-center gap-4">
							<ActiveLink
								className="text-lg"
								href={`/products/${page}` as unknown as UrlObject}
							>
								{page}
							</ActiveLink>

							{pageIndex !== numOfPages - 1 && <span>|</span>}
						</li>
					),
				)}
			</ul>
		</nav>
	);
};
