import { type TextareaHTMLAttributes } from "react";

type FormInputProps = {
	label: string;
	error?: string;
};

export const FormTextArea = ({
	label,
	error = "",
	...props
}: FormInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
	<label>
		<span className="text-sm font-bold text-gray-900">{label}</span>

		<textarea
			className="max-h-48 min-h-28 w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-950 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
			{...props}
		/>

		<div className="min-h-4 text-xs text-red-500">{error}</div>
	</label>
);
