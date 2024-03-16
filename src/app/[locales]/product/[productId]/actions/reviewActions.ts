"use server";

import { type FormSchemaType, formSchema } from "../ReviewForm/formSchema";
import { addReviewToProduct } from "@/api/products/addReviewToProduct";

export const formAction = async (formData: FormSchemaType) => {
	await formSchema.parseAsync(formData);

	await addReviewToProduct({
		productId: formData.productId,
		author: formData.name,
		email: formData.email,
		rating: Number(formData.rating) + 1,
		title: formData.headline,
		description: formData.content,
	});
};
