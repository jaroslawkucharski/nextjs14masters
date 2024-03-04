import { HeartCrack } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<HeartCrack className="h-28 w-28 text-slate-500" />

			<p className="my-2 text-2xl">This page could not be found.</p>

			<Link
				href={{ pathname: "/" }}
				className="text-sm uppercase hover:underline"
			>
				Return to the home page
			</Link>
		</div>
	);
}
