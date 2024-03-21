/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getLocale, getTranslations } from "next-intl/server";
import { getProductById } from "@/api/products/getProductById";
import { formatMoney } from "@/utils/intl";
import { Rating } from "@/ui/atoms/Rating";

export const runtime = "edge";

export const alt = "NextShop";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

type OgTypes = {
	params: { productId: string };
};

export default async function og({ params }: OgTypes) {
	const t = await getTranslations();
	const lang = await getLocale();

	const { id, name, price, images, categories, rating } = await getProductById(
		params.productId,
	);

	return new ImageResponse(
		(
			<div tw="p- flex h-full w-full items-center justify-evenly gap-8 bg-slate-100 text-gray-950">
				<img src={images[0]?.url} alt={name} width={300} height={300} />

				<div tw="flex flex-col p-4">
					<h1 tw="text-2xl font-medium text-gray-950 lg:text-4xl">{name}</h1>

					<p tw="my-2 pt-1 text-2xl font-semibold text-gray-900 lg:my-4 lg:text-4xl">
						{formatMoney(price, lang)}
					</p>

					<Rating rating={rating} />

					<p tw="text-lg text-gray-500">
						{t(`word-${categories[0]?.name.toLocaleLowerCase()}`) || ""}
					</p>

					<p tw="text-xm mt-4 text-gray-400">{`${process.env.NEXT_PUBLIC_URL}/product/${name}/${id}`}</p>
				</div>
			</div>
		),
	);
}
