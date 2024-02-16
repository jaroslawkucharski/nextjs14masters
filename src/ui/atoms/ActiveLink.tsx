"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { type Route } from "next";
import { type ReactNode } from "react";

type ActiveLinkProps = {
	className?: string;
	activeClassName?: string;
	disabledClassName?: string;
	href: Route;
	children: ReactNode;
	exact?: boolean;
	isDisabled?: boolean;
};

export const ActiveLink = ({
	className = "",
	activeClassName = "",
	disabledClassName = "",
	href,
	children,
	exact,
	isDisabled,
}: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			className={clsx(`text-lg text-gray-500 hover:text-gray-900`, {
				["font-semibold text-gray-900"]: isActive,
				["pointer-events-none text-gray-400"]: isDisabled,
				[className]: className,
				[activeClassName]: isActive,
				[disabledClassName]: isDisabled,
			})}
			href={href}
			aria-current={isActive}
			aria-disabled={isDisabled}
		>
			{children}
		</Link>
	);
};
