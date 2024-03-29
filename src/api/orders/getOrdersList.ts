import { executeGraphQl } from "../graphqlApi";
import {
	OrdersGetListDocument,
	type SortDirection,
	type OrderSortBy,
	type OrderStatus,
} from "@/gql/graphql";

type GetOrdersListRequest = {
	take?: number;
	skip?: number;
	orderBy?: OrderSortBy;
	order?: SortDirection;
	email: string;
};

type GetOrdersListResponse = {
	orders: {
		createdAt: string;
		id: string;
		lines: {
			cartId: string;
			productQuantity: number;
			productId: number;
			productName: string;
			productSlug: string;
			productPrice: number;
		}[];
		status: OrderStatus;
		totalAmount: number;
		updatedAt: string;
	}[];
	numOfProducts: number;
};

export const getOrdersList = async ({
	take = 8,
	skip = 0,
	orderBy = "DEFAULT",
	order = "ASC",
	email,
}: GetOrdersListRequest): Promise<GetOrdersListResponse> => {
	const graphqlResponse = await executeGraphQl({
		query: OrdersGetListDocument,
		variables: {
			take,
			skip,
			orderBy,
			order,
			email,
		},
		next: {
			revalidate: 30,
		},
	});

	const numOfProducts = graphqlResponse.orders.meta.total;
	const orders = graphqlResponse.orders.data as GetOrdersListResponse["orders"];

	return { orders, numOfProducts };
};
