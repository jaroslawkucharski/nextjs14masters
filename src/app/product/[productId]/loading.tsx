import { Loader } from "@/ui/atoms/Loader";

export default async function Loading() {
	return (
		<div className="w-f flex justify-center">
			<Loader />
		</div>
	);
}
