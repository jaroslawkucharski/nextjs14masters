"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { type ComponentProps } from "react";

type ActiveLinkProps = ComponentProps<typeof Link> & {
	activeClassName?: string;
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
	// const isActive = exact ? pathname === href : pathname.startsWith(href);
	const matchedPath = (typeof href === "string" ? href : href.pathname) ?? null;
	const isActive =
		matchedPath &&
		pathname &&
		(exact ? pathname === matchedPath : pathname.startsWith(matchedPath));

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
