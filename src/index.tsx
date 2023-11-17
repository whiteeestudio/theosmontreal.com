import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const httpLink = createHttpLink({
  uri: "https://theos123.myshopify.com/api/2023-07/graphql.json",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "X-Shopify-Storefront-Access-Token": "7e318ce64aa9a2d44900c1b2b5036312",
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
