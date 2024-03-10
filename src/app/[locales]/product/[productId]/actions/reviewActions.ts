"use server";

import { type FormSchemaType, formSchema } from "../formSchema";
import { addReviewToProduct } from "@/api/products/addReviewToProduct";

export const formAction = async (formData: FormSchemaType) => {
	await formSchema.parseAsync(formData);

	await addReviewToProduct({
		productId: formData.productId,
		author: formData.name,
		email: formData.email,
		rating: Number(formData.rating),
		title: formData.headline,
		description: formData.content,
	});
};