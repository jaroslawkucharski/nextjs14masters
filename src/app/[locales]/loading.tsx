import { Loader } from "@/ui/atoms/Loader";

export default async function Loading() {
	return (
		<div className="flex w-full flex-col items-center justify-center pt-20 text-center">
			<Loader />
		</div>
	);
}
