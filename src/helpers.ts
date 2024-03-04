import { DEFAULT_AMOUNT_OF_PRODUCTS } from "./constants";

export const getNumOfPages = (
	numOfProducts: number,
	amountOfProducts: number,
) => Math.ceil(numOfProducts / amountOfProducts);

export const getSkip = (page: string) =>
	Number(page) * DEFAULT_AMOUNT_OF_PRODUCTS - DEFAULT_AMOUNT_OF_PRODUCTS;

export const returnProductsNotFound = (page: string, numOfPages: number) =>
	Number(page) < 1 || Number(page) > numOfPages || isNaN(Number(page));
