"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { formAction } from "../actions/reviewActions";
import { formSchema } from "./formSchema";
import { useTypeSafeFormState } from "@/utils/typeSafeForm";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { Loader } from "@/ui/atoms/Loader";

type AddReviewFormProps = {
	productId: string;
	i18n: {
		name: string;
		namePlaceholder: string;
		email: string;
		emailPlaceholder: string;
		headline: string;
		headlinePlaceholder: string;
		content: string;
		contentPlaceholder: string;
		rating: string;
		button: string;
	};
	email?: string;
	name?: string;
};

export const ReviewForm = ({
	productId,
	i18n,
	email,
	name,
}: AddReviewFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [state, action] = useTypeSafeFormState(formSchema, async (data) => {
		await formAction(data);

		formRef.current?.reset();
	});

	const [rating, setRating] = useState(5);

	const handleChangeRating = (rating: number) => {
		setRating(rating);
	};

	return isClient ? (
		<Suspense fallback={<Loader />}>
			<form
				className="min-w-full sm:min-w-[450px]"
				data-testid="add-review-form"
				action={action}
				ref={formRef}
				noValidate
			>
				<label>
					<span className="text-sm font-bold text-gray-900">
						{i18n.headline}
					</span>

					<input type="hidden" name="productId" value={productId} />

					<input
						className="w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-950 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
						placeholder={i18n.headlinePlaceholder}
						type="text"
						name="headline"
						required
					/>

					<div className="min-h-4 text-xs text-red-500">
						{state?.errors.headline}
					</div>
				</label>

				<label>
					<span className="text-sm font-bold text-gray-900">
						{i18n.content}
					</span>

					<textarea
						className="max-h-48 min-h-28 w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-950 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
						placeholder={i18n.contentPlaceholder}
						name="content"
						required
					/>

					<div className="min-h-4 text-xs text-red-500">
						{state?.errors.content}
					</div>
				</label>

				<div className="mb-4 flex items-center justify-between">
					<span className="text-sm font-bold text-gray-900">{i18n.rating}</span>

					<div className="flex items-center">
						<span
							className="mr-2 self-center text-xs"
							data-testid="product-rating"
						>
							{`${rating} / 5`}
						</span>

						{Array.from({ length: 5 }).map((_, index) => (
							<label key={index} className="cursor-pointer">
								<input
									type="radio"
									name="rating"
									value={index}
									checked={rating === index + 1}
									onChange={() => handleChangeRating(index + 1)}
									className="sr-only"
								/>
								<Star
									className={clsx("h-4 w-4 text-gray-400", {
										["fill-current text-yellow-400"]: index < rating,
									})}
								/>
							</label>
						))}
					</div>
				</div>

				<label>
					<span className="text-sm font-bold text-gray-900">{i18n.name}</span>

					<input
						className="w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-950 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
						placeholder={i18n.namePlaceholder}
						name="name"
						type="text"
						value={name}
						required
					/>

					<div className="min-h-4 text-xs text-red-500">
						{state?.errors.name}
					</div>
				</label>

				<label>
					<span className="text-sm font-bold text-gray-900">{i18n.email}</span>

					<input
						className="w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-950 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 disabled:bg-slate-200 lg:min-w-4"
						placeholder={i18n.emailPlaceholder}
						name="email"
						type="email"
						value={email}
						required
					/>

					<div className="min-h-4 text-xs text-red-500">
						{state?.errors.email}
					</div>
				</label>

				<StatusButton>{i18n.button}</StatusButton>
			</form>
		</Suspense>
	) : (
		<div className="flex min-w-full justify-center sm:min-w-[450px]">
			<Loader />
		</div>
	);
};
