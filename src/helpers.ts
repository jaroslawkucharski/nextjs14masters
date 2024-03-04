export const getNumOfPages = (
	numOfProducts: number,
	amountOfProducts: number,
) => Math.ceil(numOfProducts / amountOfProducts);
