import { Loader } from "@/ui/atoms/Loader";

export default async function Loading() {
	return (
		<div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center text-center">
			<Loader />
		</div>
	);
}
