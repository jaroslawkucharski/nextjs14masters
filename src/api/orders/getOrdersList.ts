import { executeGraphQl } from "../graphqlApi";
import {
	OrdersGetListDocument,
	type OrdersGetListQuery,
	type OrdersGetListQueryVariables,
} from "@/gql/graphql";

export const getOrdersList = async ({
	take = 8,
	skip = 0,
	orderBy = "DEFAULT",
	order = "ASC",
	email,
}: OrdersGetListQueryVariables): Promise<
	OrdersGetListQuery["orders"]["data"]
> => {
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

	const orders = graphqlResponse.orders.data;

	return orders;
};
