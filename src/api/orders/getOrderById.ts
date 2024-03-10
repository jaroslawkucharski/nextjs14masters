import { executeGraphQl } from "../graphqlApi";
import {
	OrderGetByIdDocument,
	type OrderStatus,
	type OrderGetByIdQueryVariables,
} from "@/gql/graphql";

type GetOrderByIdResponse = {
	order: {
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
	};
};

export const getOrderById = async (
	id: OrderGetByIdQueryVariables["id"],
): Promise<GetOrderByIdResponse["order"] | null> => {
	const graphqlResponse = await executeGraphQl({
		query: OrderGetByIdDocument,
		variables: {
			id,
		},
		next: {
			revalidate: 30,
		},
	});

	const order = graphqlResponse.order as GetOrderByIdResponse["order"];

	if (!order) {
		return null;
	}

	return order;
};
