/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CartAddItemMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
}>;


export type CartAddItemMutation = { cartAddItem: { id: string } };

export type CartChangeItemQuantityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartChangeItemQuantityMutation = { cartChangeItemQuantity: { id: string } };

export type CartCompleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type CartCompleteMutation = { cartComplete: { id: string, createdAt: unknown, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown } };

export type CartCreateMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartCreateMutation = { cartFindOrCreate: { id: string } };

export type CartGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CartGetByIdQuery = { cart?: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, slug: string, description: string, images: Array<{ id: string, url: string }> } }> } | null };

export type CartRemoveItemMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type CartRemoveItemMutation = { cartRemoveItem: { id: string } };

export type CategoryGetListQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CategoryGetListQuery = { categories: { data: Array<{ id: string, name: string, slug: string }> } };

export type CollectionGetListQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionGetListQuery = { collections: { data: Array<{ id: string, name: string, description: string, slug: string }> } };

export type OrderGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderGetByIdQuery = { order?: { createdAt: unknown, id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown } | null };

export type OrderListItemFragment = { createdAt: unknown, id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown };

export type OrdersGetListQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy?: InputMaybe<OrderSortBy>;
  order?: InputMaybe<SortDirection>;
  email: Scalars['String']['input'];
}>;


export type OrdersGetListQuery = { orders: { data: Array<{ createdAt: unknown, id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown }>, meta: { count: number, total: number } } };

export type ProductAddReviewMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type ProductAddReviewMutation = { reviewCreate: { id: string } };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product?: { id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> } | null };

export type ProductListFragment = { products: { data: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> }>, meta: { total: number, count: number } } };

export type ProductListItemFragment = { id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> };

export type ProductsGetByCategorySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCategorySlugQuery = { category?: { name: string, description: string, slug: string, products: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> }> } | null };

export type ProductsGetByCollectionSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCollectionSlugQuery = { collection?: { name: string, description: string, slug: string, products: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> }> } | null };

export type ProductsGetListQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy?: InputMaybe<ProductSortBy>;
  order?: InputMaybe<SortDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsGetListQuery = { products: { data: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string }>, images: Array<{ url: string }>, reviews: Array<{ createdAt: unknown, updatedAt: unknown, id: string, author: string, title: string, description: string, email: string, rating: number }> }>, meta: { total: number, count: number } } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const OrderListItemFragmentDoc = new TypedDocumentString(`
    fragment OrderListItem on Order {
  createdAt
  id
  lines
  status
  totalAmount
  updatedAt
}
    `, {"fragmentName":"OrderListItem"}) as unknown as TypedDocumentString<OrderListItemFragment, unknown>;
export const ProductListItemFragmentDoc = new TypedDocumentString(`
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}
    `, {"fragmentName":"ProductListItem"}) as unknown as TypedDocumentString<ProductListItemFragment, unknown>;
export const ProductListFragmentDoc = new TypedDocumentString(`
    fragment ProductList on Query {
  products(take: $take, skip: $skip) {
    data {
      ...ProductListItem
    }
    meta {
      total
      count
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}`, {"fragmentName":"ProductList"}) as unknown as TypedDocumentString<ProductListFragment, unknown>;
export const CartAddItemDocument = new TypedDocumentString(`
    mutation CartAddItem($productId: String!, $quantity: Int!, $id: ID!) {
  cartAddItem(
    input: {item: {productId: $productId, quantity: $quantity}}
    id: $id
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartAddItemMutation, CartAddItemMutationVariables>;
export const CartChangeItemQuantityDocument = new TypedDocumentString(`
    mutation CartChangeItemQuantity($id: ID!, $quantity: Int!, $productId: ID!) {
  cartChangeItemQuantity(id: $id, quantity: $quantity, productId: $productId) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartChangeItemQuantityMutation, CartChangeItemQuantityMutationVariables>;
export const CartCompleteDocument = new TypedDocumentString(`
    mutation CartComplete($id: ID!, $email: String!) {
  cartComplete(cartId: $id, userEmail: $email) {
    id
    createdAt
    lines
    status
    totalAmount
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CartCompleteMutation, CartCompleteMutationVariables>;
export const CartCreateDocument = new TypedDocumentString(`
    mutation CartCreate($productId: String!, $quantity: Int!) {
  cartFindOrCreate(input: {items: {productId: $productId, quantity: $quantity}}) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartCreateMutation, CartCreateMutationVariables>;
export const CartGetByIdDocument = new TypedDocumentString(`
    query CartGetById($id: ID!) {
  cart(id: $id) {
    id
    items {
      product {
        id
        name
        price
        slug
        description
        images {
          id
          url
        }
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<CartGetByIdQuery, CartGetByIdQueryVariables>;
export const CartRemoveItemDocument = new TypedDocumentString(`
    mutation CartRemoveItem($productId: ID!, $id: ID!) {
  cartRemoveItem(productId: $productId, id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartRemoveItemMutation, CartRemoveItemMutationVariables>;
export const CategoryGetListDocument = new TypedDocumentString(`
    query CategoryGetList($take: Int, $skip: Int) {
  categories(take: $take, skip: $skip) {
    data {
      id
      name
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<CategoryGetListQuery, CategoryGetListQueryVariables>;
export const CollectionGetListDocument = new TypedDocumentString(`
    query CollectionGetList($take: Int, $skip: Int) {
  collections(take: $take, skip: $skip) {
    data {
      id
      name
      description
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionGetListQuery, CollectionGetListQueryVariables>;
export const OrderGetByIdDocument = new TypedDocumentString(`
    query OrderGetById($id: ID!) {
  order(id: $id) {
    ...OrderListItem
  }
}
    fragment OrderListItem on Order {
  createdAt
  id
  lines
  status
  totalAmount
  updatedAt
}`) as unknown as TypedDocumentString<OrderGetByIdQuery, OrderGetByIdQueryVariables>;
export const OrdersGetListDocument = new TypedDocumentString(`
    query OrdersGetList($take: Int!, $skip: Int!, $orderBy: OrderSortBy, $order: SortDirection, $email: String!) {
  orders(
    email: $email
    order: $order
    orderBy: $orderBy
    skip: $skip
    take: $take
  ) {
    data {
      ...OrderListItem
    }
    meta {
      count
      total
    }
  }
}
    fragment OrderListItem on Order {
  createdAt
  id
  lines
  status
  totalAmount
  updatedAt
}`) as unknown as TypedDocumentString<OrdersGetListQuery, OrdersGetListQueryVariables>;
export const ProductAddReviewDocument = new TypedDocumentString(`
    mutation ProductAddReview($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<ProductAddReviewMutation, ProductAddReviewMutationVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    ...ProductListItem
  }
}
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductsGetByCategorySlugDocument = new TypedDocumentString(`
    query ProductsGetByCategorySlug($slug: String!) {
  category(slug: $slug) {
    name
    description
    slug
    products {
      ...ProductListItem
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetByCategorySlugQuery, ProductsGetByCategorySlugQueryVariables>;
export const ProductsGetByCollectionSlugDocument = new TypedDocumentString(`
    query ProductsGetByCollectionSlug($slug: String!) {
  collection(slug: $slug) {
    name
    description
    slug
    products {
      ...ProductListItem
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetByCollectionSlugQuery, ProductsGetByCollectionSlugQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($take: Int!, $skip: Int!, $orderBy: ProductSortBy, $order: SortDirection, $search: String) {
  products(
    take: $take
    skip: $skip
    orderBy: $orderBy
    order: $order
    search: $search
  ) {
    data {
      ...ProductListItem
    }
    meta {
      total
      count
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  description
  categories {
    name
  }
  images {
    url
  }
  price
  rating
  slug
  reviews {
    createdAt
    updatedAt
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;