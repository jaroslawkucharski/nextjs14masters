import { UserProfile } from "@clerk/nextjs";

export default function Page() {
	return (
		<section className="mx-auto flex max-w-md justify-center p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<UserProfile />
		</section>
	);
}
