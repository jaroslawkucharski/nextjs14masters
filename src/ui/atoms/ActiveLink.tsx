"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { type ReactNode } from "react";

type ActiveLinkProps = {
	className?: string;
	activeClassName?: string;
	href: string;
	children: ReactNode;
	exact?: boolean;
};

export const ActiveLink = ({
	className = "",
	activeClassName = "",
	href,
	children,
	exact,
}: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			className={clsx(`text-gray-500 hover:text-gray-900`, {
				["font-semibold text-gray-900"]: isActive,
				[className]: className,
				[activeClassName]: isActive,
			})}
			href={href}
			aria-current={isActive ? isActive : undefined}
		>
			{children}
		</Link>
	);
};
