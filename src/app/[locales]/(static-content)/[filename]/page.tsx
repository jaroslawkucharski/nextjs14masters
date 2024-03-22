import { notFound } from "next/navigation";
import { type ComponentType } from "react";

export type StaticPageType = {
	params: {
		filename: string;
	};
};

export default async function StaticPage({ params }: StaticPageType) {
	const Content = await import(`./${params.filename}.mdx`).then(
		(m: { default: ComponentType }) => m.default,
		() => notFound(),
	);

	return (
		<section className="mx-auto max-w-md gap-4 overflow-x-auto p-4 sm:max-w-2xl sm:p-12 sm:py-8 md:max-w-4xl lg:max-w-7xl lg:flex-row">
			<article className="prose">
				<Content />
			</article>
		</section>
	);
}
