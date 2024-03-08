"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQl } from "../graphqlApi";
import {
	type ProductAddReviewMutationVariables,
	type ProductAddReviewMutation,
	ProductAddReviewDocument,
} from "@/gql/graphql";

export const addReviewToProduct = async ({
	author,
	description,
	email,
	productId,
	rating,
	title,
}: ProductAddReviewMutationVariables): Promise<ProductAddReviewMutation> => {
	const createReview = await executeGraphQl({
		query: ProductAddReviewDocument,
		variables: {
			author,
			description,
			email,
			productId,
			rating,
			title,
		},
		cache: "no-store",
		next: {
			tags: ["product"],
		},
	});

	revalidateTag("product");

	return createReview;
};
