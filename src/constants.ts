export const DEFAULT_AMOUNT_OF_PRODUCTS = 8;
export const CATEGORY_AMOUNT_OF_PRODUCTS = 4;

export const PATHS = {
	HOME: "/",
	SEARCH: "/search",
	CART: "/cart",
	CHECKOUT: "/checkout",
	CATEGORIES: "/categories",
	COLLECTIONS: "/collections",
	PRODUCT: "/product",
	PRODUCTS: "/products",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	PRIVACY_POLICY: "/privacy-policy",
	CONTACT: "/contact",
	EN: "/en",
	PL: "/pl",
} as const;

export const CHECKOUT_STATUSES = {
	ACTIVE: "active",
	COMPLETED: "completed",
	UPCOMING: "upcoming",
} as const;

export const CHECKOUT_STEPS = {
	CART: "cart",
	CHECKOUT: "checkout",
} as const;

export type CheckoutStatusesType =
	(typeof CHECKOUT_STATUSES)[keyof typeof CHECKOUT_STATUSES];

export type CheckoutStepsType =
	(typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];
