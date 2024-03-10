import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export default async function Page() {
	const t = await getTranslations("Home");

	return (
		<section className="mx-auto flex max-w-md justify-center p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			{t("title")}
			<SignIn />
		</section>
	);
}
