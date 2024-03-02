"use client";

import { useRouter } from "next/navigation";

export function Overlay() {
	const router = useRouter();

	return (
		<div
			onClick={() => router.back()}
			className="animation-fade-in fixed inset-0 z-30 bg-slate-800 bg-opacity-75 backdrop-blur-md"
		/>
	);
}
