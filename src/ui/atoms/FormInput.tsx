import { type InputHTMLAttributes } from "react";

type FormInputProps = {
	label: string;
	error?: string;
};

export const FormInput = ({
	label,
	error = "",
	...props
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) => (
	<label>
		<span className="text-sm font-bold text-gray-900">{label}</span>

		<input
			className="w-full appearance-none self-start rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-400 ring-1 ring-inset ring-gray-400 placeholder:text-slate-400 focus:border-gray-900 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:min-w-4"
			{...props}
		/>

		<div className="min-h-4 text-xs text-red-500">{error}</div>
	</label>
);
