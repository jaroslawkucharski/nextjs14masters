"use client";

import { useFormStatus } from "react-dom";
import { type ReactNode } from "react";
import { Button } from "@/ui/atoms/Button";

type StatusButtonProps = {
	children: ReactNode;
};

export const StatusButton = ({ children }: StatusButtonProps) => {
	const formStatus = useFormStatus();

	return (
		<Button
			type="submit"
			data-testid="add-to-cart-button"
			disabled={formStatus.pending}
			isLoading={formStatus.pending}
		>
			{children}
		</Button>
	);
};
