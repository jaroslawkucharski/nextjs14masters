import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
	title: "Products - Next.js Masters",
	description: "Products page.",
};

export default async function ProductsLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<section>
			<h2 className="mb-10 text-center text-2xl md:text-left lg:text-left">
				ALL
			</h2>

			{children}
		</section>
	);
}
