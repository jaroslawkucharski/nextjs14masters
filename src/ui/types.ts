export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	price: number;
	description: string;
	longDescription: string;
	coverImage: {
		src: string;
		alt: string;
	};
};
