/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n      }\n      images {\n        url\n      }\n      price\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($take: Int!, $skip: Int!) {\n  products(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n      }\n      images {\n        url\n      }\n      price\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n      }\n      images {\n        url\n      }\n      price\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($take: Int!, $skip: Int!) {\n  products(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n      }\n      images {\n        url\n      }\n      price\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
