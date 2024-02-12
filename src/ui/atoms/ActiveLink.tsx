"use client";

import { type UrlObject } from "url";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { type ReactNode } from "react";

type ActiveLinkProps = {
	href: UrlObject;
	children: ReactNode;
};

export const ActiveLink = ({ href, children }: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === String(href);

	return (
		<Link
			className={clsx(`text-gray-500 hover:text-gray-900`, {
				["font-semibold text-gray-900"]: isActive,
			})}
			href={href}
			aria-current={isActive}
		>
			{children}
		</Link>
	);
};
