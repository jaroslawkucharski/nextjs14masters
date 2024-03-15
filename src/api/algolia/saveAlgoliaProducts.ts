import algoliasearch, { type SearchClient } from "algoliasearch";
import { getProductList } from "@/api/products/getProductList";

const client: SearchClient = algoliasearch(
	process.env.ALGOLIA_APP_ID as string,
	process.env.ALGOLIA_API_KEY as string,
);

const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME as string);

export const saveAlgoliaProducts = async () => {
	const { products } = await getProductList({
		take: 50,
	});

	const agoliaProducts = products.map((product) => {
		return {
			objectID: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			slug: product.slug,
			rating: product.rating,
			images: product.images,
			categories: product.categories,
		};
	});

	await index
		.saveObjects(agoliaProducts, { autoGenerateObjectIDIfNotExist: true })
		.catch((error) => new Error(`Error: ${error}`));
};
