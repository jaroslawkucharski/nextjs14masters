"use client";

import { useState, type ReactNode } from "react";

type MobileNavigationProps = {
	children: ReactNode;
};

export const MobileNavigation = ({ children }: MobileNavigationProps) => {
	const [isActive, setActive] = useState(false);

	const toggleActive = () => {
		setActive(!isActive);
	};

	return (
		<div className="static lg:hidden">
			<div className="space-y-2" onClick={toggleActive}>
				<span className="block h-0.5 w-7 bg-gray-950"></span>

				<span className="block h-0.5 w-7 bg-gray-950"></span>

				<span className="block h-0.5 w-7 bg-gray-950"></span>
			</div>

			{isActive && (
				<div className="absolute left-0 z-10 mt-6 w-full bg-slate-50 pb-8 pt-4">
					<div className="mx-auto h-fit w-fit" onClick={toggleActive}>
						{children}
					</div>
				</div>
			)}
		</div>
	);
};
