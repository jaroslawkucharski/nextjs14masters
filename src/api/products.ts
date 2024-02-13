type ProductResponseRequest = {
	take?: string;
	offset?: string;
};

type ProductResponseItem = {
	id: string;
	category: string;
	title: string;
	description: string;
	longDescription: string;
	price: number;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

const productResponseItemToProductItemType = (product: ProductResponseItem) => {
	return {
		id: product.id,
		category: product.category,
		name: product.title,
		price: product.price,
		description: product.description,
		longDescription: product.longDescription,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
	};
};

export const getProducts = async ({
	take,
	offset,
}: ProductResponseRequest = {}) => {
	const searchParams = new URLSearchParams({
		...(take && { take }),
		...(offset && { offset }),
	});

	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products?${searchParams.toString()}`,
	);

	const products = (await response.json()) as ProductResponseItem[];

	return products.map(productResponseItemToProductItemType);
};

export const getProductsById = async (id: ProductResponseItem["id"]) => {
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const product = (await response.json()) as ProductResponseItem;

	return productResponseItemToProductItemType(product);
};
