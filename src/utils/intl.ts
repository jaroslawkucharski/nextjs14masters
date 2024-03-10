export const formatMoney = (amount: number, lang: string) =>
	new Intl.NumberFormat(lang, {
		style: "currency",
		currency: lang === "pl" ? "PLN" : "USD",
	}).format((lang === "pl" ? amount * 3.91 : amount) / 100);

export const formatDate = (
	date: string,
	lang: string,
	style?: "long" | "short",
) =>
	new Intl.DateTimeFormat(lang, {
		dateStyle: style || "long",
	}).format(new Date(date));
