import { type Metadata } from "next";
import { type ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { EmptyView } from "../EmptyView";
import { Pagination } from "@/ui/molecules/Pagination";
import { DEFAULT_AMOUNT_OF_PRODUCTS, PATHS } from "@/constants";
import { PageHeading } from "@/ui/molecules/PageHeading";
import { getNumOfPages, returnProductsNotFound } from "@/helpers";
import { getOrdersList } from "@/api/orders/getOrdersList";

type ProductsLayoutType = {
	children: ReactNode;
	params: {
		page: string;
	};
};

export const metadata = async (): Promise<Metadata> => {
	const t = await getTranslations();

	return {
		title: t("orders-title"),
		description: t("orders-description"),
	};
};

export default async function ProductsLayout({
	children,
	params,
}: ProductsLayoutType) {
	const t = await getTranslations();

	const user = await currentUser();

	if (!user) {
		redirect(PATHS.SIGN_IN);
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return <div>User does not have email</div>;
	}

	const { orders, numOfProducts } = await getOrdersList({ email });

	if (orders.length === 0) {
		return <EmptyView />;
	}

	const numOfPages = getNumOfPages(numOfProducts, DEFAULT_AMOUNT_OF_PRODUCTS);

	if (returnProductsNotFound(params.page, numOfPages)) {
		return notFound();
	}

	return (
		<>
			<PageHeading title={t("orders-title")} />

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
