import { Button } from "@/ui/atoms/Button";

const inputStyles =
	"w-full mb-4 appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4";

export const AddReviewForm = () => {
	return (
		<form className="min-w-full sm:min-w-[450px]" data-testid="add-review-form">
			<input
				className={inputStyles}
				placeholder="Name"
				type="text"
				name="author"
			/>
			<input
				className={inputStyles}
				placeholder="Email"
				type="email"
				name="email"
			/>

			<input
				className={inputStyles}
				placeholder="Title"
				type="text"
				name="headline"
			/>

			<textarea
				className={inputStyles}
				placeholder="Description"
				name="content"
			/>

			<Button type="submit">Send</Button>
		</form>
	);
};
