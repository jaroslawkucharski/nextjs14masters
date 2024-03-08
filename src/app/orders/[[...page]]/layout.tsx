import { type Metadata } from "next";
import { type ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { Pagination } from "@/ui/molecules/Pagination";
import { DEFAULT_AMOUNT_OF_PRODUCTS } from "@/constants";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { getNumOfPages, returnProductsNotFound } from "@/helpers";
import { getOrdersList } from "@/api/orders/getOrdersList";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		page: string;
	};
};

export const metadata: Metadata = {
	title: "All orders",
	description: "Orders page.",
};

export default async function ProductsLayout({
	children,
	params,
}: ProductsLayoutType) {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return <div>User does not have email</div>;
	}

	const { numOfProducts } = await getOrdersList({ email });
	const numOfPages = getNumOfPages(numOfProducts, DEFAULT_AMOUNT_OF_PRODUCTS);

	if (returnProductsNotFound(params.page, numOfPages)) {
		return notFound();
	}

	return (
		<>
			<PageHeading title="Your orders" />

			<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
				{children}

				<Pagination
					totalItems={numOfProducts}
					currentPage={Number(params.page)}
					path="orders"
				/>
			</section>
		</>
	);
}
