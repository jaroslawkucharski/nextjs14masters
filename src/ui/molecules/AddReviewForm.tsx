"use client";

import { type ChangeEvent, useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/ui/atoms/Button";
import { addReviewToProduct } from "@/api/product/addReviewToProduct";

const inputStyles =
	"w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4";

type AddReviewFormProps = {
	productId: string;
};

export const AddReviewForm = ({ productId }: AddReviewFormProps) => {
	// TODO - formStatus
	// const formStatus = useFormStatus();

	const [selectedStar, setSelectedStar] = useState(5);

	// TODO - useOptimistic
	const [formData, setFormData] = useState({
		author: "",
		email: "",
		headline: "",
		content: "",
		productId,
		rating: selectedStar,
	});

	const [errors, setErrors] = useState({
		author: "",
		email: "",
		headline: "",
		content: "",
	});

	const [formStatus, setFormStatus] = useState({
		pending: false,
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

	const handleStarClick = (star: number) => {
		setSelectedStar(star);
	};

	const handleSubmit = async () => {
		const { author, email, headline, content } = formData;

		setErrors({
			author: "",
			email: "",
			headline: "",
			content: "",
		});

		if (author && email && headline && content) {
			setFormStatus({ pending: true });

			await addReviewToProduct({
				author,
				description: content,
				email,
				productId: productId,
				rating: selectedStar,
				title: headline,
			});

			setFormStatus({ pending: false });

			setSelectedStar(5);

			setFormData({
				author: "",
				email: "",
				headline: "",
				content: "",
				productId,
				rating: selectedStar,
			});
		} else {
			const newErrors = {
				author: !author ? "Name is required" : "",
				email: !email ? "Email is required" : "",
				headline: !headline ? "Title is required" : "",
				content: !content ? "Description is required" : "",
			};

			setErrors(newErrors);
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
						{`${selectedStar} / 5`}
					</span>

					{Array.from({ length: 5 }).map((_, index) => (
						<Star
							key={index}
							className={clsx("h-4 w-4 text-gray-400", {
								["fill-current text-yellow-400"]: index < selectedStar,
							})}
							onClick={() => handleStarClick(index + 1)}
						/>
					))}
				</div>
			</div>

			<label>
				<span className="text-sm font-bold text-gray-900">Name</span>

				<input
					className={inputStyles}
					placeholder="Name"
					type="text"
					name="author"
					value={formData.author}
					onChange={handleChange}
					required
				/>

				<div className="min-h-4 text-xs text-red-500">{errors.author}</div>
			</label>

			<label>
				<span className="text-sm font-bold text-gray-900">Email</span>

				<input
					className={inputStyles}
					placeholder="Email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<div className="min-h-4 text-xs text-red-500">{errors.email}</div>
			</label>

			<label>
				<span className="text-sm font-bold text-gray-900">Title</span>

				<input
					className={inputStyles}
					placeholder="Title"
					type="text"
					name="headline"
					value={formData.headline}
					onChange={handleChange}
					required
				/>

				<div className="min-h-4 text-xs text-red-500">{errors.headline}</div>
			</label>

			<label>
				<span className="text-sm font-bold text-gray-900">Description</span>
				<textarea
					className={inputStyles}
					placeholder="Description"
					name="content"
					value={formData.content}
					onChange={handleChange}
					required
				/>

				<div className="min-h-4 text-xs text-red-500">{errors.content}</div>
			</label>

			<Button
				className="mt-4"
				type="submit"
				disabled={formStatus.pending}
				isLoading={formStatus.pending}
			>
				Add a review
			</Button>
		</form>
	);
};
