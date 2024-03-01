export const formatMoney = (amount: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount / 100);

export const formatDate = (date: string) =>
	new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
	}).format(new Date(date));
