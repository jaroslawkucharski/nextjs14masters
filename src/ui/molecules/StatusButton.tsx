"use client";

import { useFormStatus } from "react-dom";
import { type ReactNode } from "react";
import { Button } from "@/ui/atoms/Button";

type StatusButtonProps = {
	"data-testid"?: string;
	children: ReactNode;
};

export const StatusButton = ({
	children,
	"data-testid": dataTestId,
}: StatusButtonProps) => {
	const formStatus = useFormStatus();

	return (
		<Button
			type="submit"
			data-testid={dataTestId}
			disabled={formStatus.pending}
			isLoading={formStatus.pending}
		>
			{children}
		</Button>
	);
};
