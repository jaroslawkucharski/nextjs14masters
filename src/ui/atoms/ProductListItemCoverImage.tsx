import Image from "next/image";

type ProductListItemCoverImageProps = {
	src: string;
	alt: string;
};

export const ProductListItemCoverImage = ({
	src,
	alt,
}: ProductListItemCoverImageProps) => (
	<div className="aspect-square overflow-hidden">
		<Image
			className="h-full w-full object-cover object-center"
			src={src}
			alt={alt}
			width={320}
			height={320}
		/>
	</div>
);
