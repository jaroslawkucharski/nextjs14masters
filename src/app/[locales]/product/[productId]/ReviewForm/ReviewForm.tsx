"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { formAction } from "../actions/reviewActions";
import { formSchema } from "./formSchema";
import { useTypeSafeFormState } from "@/utils/typeSafeForm";
import { StatusButton } from "@/ui/molecules/StatusButton";
import { Loader } from "@/ui/atoms/Loader";
import { FormInput } from "@/ui/atoms/FormInput";
import { FormTextArea } from "@/ui/atoms/FormTextArea";

type AddReviewFormProps = {
	productId: string;
	email?: string;
	name?: string;
};

export const ReviewForm = ({ productId, email, name }: AddReviewFormProps) => {
	const t = useTranslations();

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
				<input type="hidden" name="productId" value={productId} readOnly />

				<FormInput
					label={t("word-headline")}
					error={state?.errors.headline}
					placeholder={t("word-headline-placeholder")}
					type="text"
					name="headline"
					required
				/>

				<FormTextArea
					label={t("word-content")}
					error={state?.errors.content}
					placeholder={t("word-content-placeholder")}
					name="content"
					required
				/>

				<div className="mb-4 flex items-center justify-between">
					<span className="text-sm font-bold text-gray-900">
						{t("word-rating")}
					</span>

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

				<FormInput
					label={t("word-name")}
					error={state?.errors.name}
					placeholder={t("word-name-placeholder")}
					name="name"
					type="text"
					defaultValue={name}
					required
				/>

				<FormInput
					label={t("word-email")}
					error={state?.errors.email}
					placeholder={t("word-email-placeholder")}
					name="email"
					type="email"
					defaultValue={email}
					required
				/>

				<StatusButton>{t("word-button")}</StatusButton>
			</form>
		</Suspense>
	) : (
		<div className="flex min-w-full justify-center sm:min-w-[450px]">
			<Loader />
		</div>
	);
};
