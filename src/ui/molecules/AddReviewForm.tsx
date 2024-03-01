"use client";

import { type ChangeEvent, useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { StatusButton } from "./StatusButton";
import { addReviewToProduct } from "@/api/product/addReviewToProduct";
import { FormInput } from "@/ui/atoms/FormInput";

type AddReviewFormProps = {
	productId: string;
};

const inputs = [
	{
		label: "Name",
		type: "text",
		name: "name",
		placeholder: "Name",
	},
	{
		label: "Email",
		type: "email",
		name: "email",
		placeholder: "Email",
	},
	{
		label: "Title",
		type: "text",
		name: "headline",
		placeholder: "Title",
	},
];

export const AddReviewForm = ({ productId }: AddReviewFormProps) => {
	// TODO - useOptimistic
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		headline: "",
		content: "",
		rating: 5,
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		headline: "",
		content: "",
	});

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleChangeRating = (star: number) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			rating: star,
		}));
	};

	const handleSubmit = async () => {
		const { name, email, headline, content, rating } = formData;

		setErrors({
			name: name ? "" : "Name is required",
			email: email ? "" : "Email is required",
			headline: headline ? "" : "Title is required",
			content: content ? "" : "Description is required",
		});

		if (name && email && headline && content) {
			await addReviewToProduct({
				author: name,
				description: content,
				email,
				productId: productId,
				rating,
				title: headline,
			});

			setFormData({
				name: "",
				email: "",
				headline: "",
				content: "",
				rating: 5,
			});
		}
	};

	return (
		<form
			className="min-w-full sm:min-w-[450px]"
			data-testid="add-review-form"
			action={handleSubmit}
			noValidate
		>
			<div className="mb-4 flex items-center justify-between">
				<span className="text-sm font-bold text-gray-900">Rating</span>

				<div className="flex items-center">
					<span
						className="mr-2 self-center text-xs"
						data-testid="product-rating"
					>
						{`${formData.rating} / 5`}
					</span>

					{Array.from({ length: 5 }).map((_, index) => (
						<label key={index} className="cursor-pointer">
							<input
								type="radio"
								name="rating"
								value={index}
								checked={formData.rating === index + 1}
								onChange={() => handleChangeRating(index + 1)}
								className="sr-only"
							/>
							<Star
								className={clsx("h-4 w-4 text-gray-400", {
									["fill-current text-yellow-400"]: index < formData.rating,
								})}
							/>
						</label>
					))}
				</div>
			</div>

			{inputs.map((input) => (
				<FormInput key={input.name} {...input} />
			))}

			<label>
				<span className="text-sm font-bold text-gray-900">Description</span>
				<textarea
					className="max-h-48 min-h-28 w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
					placeholder="Description"
					name="content"
					value={formData.content}
					onChange={handleChange}
					required
				/>

				<div className="min-h-4 text-xs text-red-500">{errors.content}</div>
			</label>

			<StatusButton>Add a review</StatusButton>
		</form>
	);
};
