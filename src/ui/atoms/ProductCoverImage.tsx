import Image from "next/image";

type ProductListItemCoverImageProps = {
	src: string;
	alt: string;
};

export const ProductCoverImage = ({
	src,
	alt,
}: ProductListItemCoverImageProps) => (
	<div className=" aspect-auto overflow-hidden">
		<Image
			className="h-full w-full object-cover object-top"
			src={src}
			alt={alt}
			width={400}
			height={400}
		/>
	</div>
);
