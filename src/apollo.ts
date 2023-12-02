import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://theos123.myshopify.com/api/2023-07/graphql.json",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "X-Shopify-Storefront-Access-Token": "7e318ce64aa9a2d44900c1b2b5036312",
  },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
