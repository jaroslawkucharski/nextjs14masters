export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	price: number;
	slug: string;
	description: string;
	coverImage?: {
		src: string;
		alt: string;
	};
};
