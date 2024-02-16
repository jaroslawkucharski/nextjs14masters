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
		<article className="prose">
			<Content />
		</article>
	);
}
