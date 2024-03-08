import { executeGraphQl } from "../graphqlApi";
import {
	OrderGetByIdDocument,
	type OrderGetByIdQuery,
	type OrderGetByIdQueryVariables,
} from "@/gql/graphql";

export const getOrderById = async (
	id: OrderGetByIdQueryVariables["id"],
): Promise<OrderGetByIdQuery> => {
	const graphqlResponse = await executeGraphQl({
		query: OrderGetByIdDocument,
		variables: {
			id,
		},
		next: {
			revalidate: 30,
		},
	});

	return graphqlResponse;
};
