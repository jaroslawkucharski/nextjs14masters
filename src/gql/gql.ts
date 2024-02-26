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
    "mutation CartAddItem($productId: String!, $quantity: Int!, $id: ID!) {\n  cartAddItem(\n    input: {item: {productId: $productId, quantity: $quantity}}\n    id: $id\n  ) {\n    id\n  }\n}": types.CartAddItemDocument,
    "mutation CartChangeItemQuantity($id: ID!, $quantity: Int!, $productId: ID!) {\n  cartChangeItemQuantity(id: $id, quantity: $quantity, productId: $productId) {\n    id\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CartComplete($id: ID!) {\n  cartComplete(cartId: $id) {\n    id\n    createdAt\n    lines\n    status\n    totalAmount\n    updatedAt\n  }\n}": types.CartCompleteDocument,
    "mutation CartCreate($productId: String!, $quantity: Int!) {\n  cartFindOrCreate(input: {items: {productId: $productId, quantity: $quantity}}) {\n    id\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  cart(id: $id) {\n    id\n    items {\n      product {\n        ... on Product {\n          id\n          name\n          price\n          images {\n            id\n            url\n          }\n        }\n      }\n      quantity\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveItem($productId: ID!, $id: ID!) {\n  cartRemoveItem(productId: $productId, id: $id) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "query CategoryGetList($take: Int, $skip: Int) {\n  categories(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      slug\n    }\n  }\n}": types.CategoryGetListDocument,
    "query CollectionGetList($take: Int, $skip: Int) {\n  collections(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      slug\n    }\n  }\n}": types.CollectionGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    slug\n    name\n    description\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    price\n    rating\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductList on Query {\n  products(take: $take, skip: $skip) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductListFragmentDoc,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n  }\n  price\n  rating\n  slug\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetList($take: Int!, $skip: Int!, $orderBy: ProductSortBy, $order: SortDirection, $search: String) {\n  products(\n    take: $take\n    skip: $skip\n    orderBy: $orderBy\n    order: $order\n    search: $search\n  ) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($productId: String!, $quantity: Int!, $id: ID!) {\n  cartAddItem(\n    input: {item: {productId: $productId, quantity: $quantity}}\n    id: $id\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($id: ID!, $quantity: Int!, $productId: ID!) {\n  cartChangeItemQuantity(id: $id, quantity: $quantity, productId: $productId) {\n    id\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartComplete($id: ID!) {\n  cartComplete(cartId: $id) {\n    id\n    createdAt\n    lines\n    status\n    totalAmount\n    updatedAt\n  }\n}"): typeof import('./graphql').CartCompleteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($productId: String!, $quantity: Int!) {\n  cartFindOrCreate(input: {items: {productId: $productId, quantity: $quantity}}) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  cart(id: $id) {\n    id\n    items {\n      product {\n        ... on Product {\n          id\n          name\n          price\n          images {\n            id\n            url\n          }\n        }\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($productId: ID!, $id: ID!) {\n  cartRemoveItem(productId: $productId, id: $id) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetList($take: Int, $skip: Int) {\n  categories(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      slug\n    }\n  }\n}"): typeof import('./graphql').CategoryGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetList($take: Int, $skip: Int) {\n  collections(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      slug\n    }\n  }\n}"): typeof import('./graphql').CollectionGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    slug\n    name\n    description\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    price\n    rating\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductList on Query {\n  products(take: $take, skip: $skip) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductListFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n  }\n  price\n  rating\n  slug\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($take: Int!, $skip: Int!, $orderBy: ProductSortBy, $order: SortDirection, $search: String) {\n  products(\n    take: $take\n    skip: $skip\n    orderBy: $orderBy\n    order: $order\n    search: $search\n  ) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
