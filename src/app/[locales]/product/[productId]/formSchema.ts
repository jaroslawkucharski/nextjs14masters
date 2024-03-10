import z from "zod";

export const formSchema = z.object({
	productId: z.string(),
	name: z.string().min(1).max(50),
	email: z.string().email(),
	rating: z.string(),
	headline: z.string().min(1).max(100),
	content: z.string().min(1).max(500),
});

export type FormSchemaType = z.TypeOf<typeof formSchema>;
