import clsx from "clsx";
import { Check } from "lucide-react";
import { CHECKOUT_STATUSES, type CheckoutStatusesType } from "@/constants";

type CheckoutTimelineProps = {
	steps: {
		id: string;
		label: string;
		status: CheckoutStatusesType;
	}[];
};

export const CheckoutTimeline = ({ steps }: CheckoutTimelineProps) => (
	<div className="flex w-full items-center justify-center gap-4 px-4 md:gap-8">
		{steps.map(({ id, label, status }, index) => {
			const statusActive = status === CHECKOUT_STATUSES.ACTIVE;
			const statusCompleted = status === CHECKOUT_STATUSES.COMPLETED;

			return (
				<div
					key={id}
					className="flex items-center justify-center gap-4 md:gap-8"
				>
					<p
						className={clsx("flex items-center gap-1 text-gray-400", {
							["cursor-pointer font-semibold text-green-600"]: statusCompleted,
							["font-semibold text-gray-950"]: statusActive,
						})}
					>
						{statusCompleted && <Check className="h-4 w-4" />}

						{label}
					</p>

					{index < steps.length - 1 && (
						<div
							className={clsx(
								"static h-1 w-4 border-b-2 border-gray-300 md:w-48 lg:w-56",
								{
									["border-green-600"]: statusCompleted,
								},
							)}
						/>
					)}
				</div>
			);
		})}
	</div>
);
