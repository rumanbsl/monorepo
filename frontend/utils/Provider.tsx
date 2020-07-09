import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/link-context";

import fetch from "isomorphic-unfetch";

const httpLink = createHttpLink({
  // https://github.com/zeit/next.js/blob/master/examples/with-custom-reverse-proxy/package.json if needed
  // "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn"
  uri         : "http://localhost:3000/graphql",
  credentials : "same-origin", // include | same-origin
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  if (token) headers.authorization = `Bearer ${token}`;
  return headers;
});

export const cache:InMemoryCache = new InMemoryCache({ typePolicies: {} });

const client = new ApolloClient({
  ssrMode : true,
  cache,
  link    : authLink.concat(httpLink),
});

export default function Provider({ children }: {children: React.ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
