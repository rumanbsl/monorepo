import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/link-context";

import fetch from "isomorphic-unfetch";

const httpLink = createHttpLink({
  // https://github.com/zeit/next.js/blob/master/examples/with-custom-reverse-proxy/package.json if needed
  // "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn"
  uri         : "/graphql",
  credentials : "same-origin", // include | same-origin
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  ssrMode : true,
  cache   : new InMemoryCache({ typePolicies: {} }),
  link    : authLink.concat(httpLink),
});

export default function Provider({ children }: {children: React.ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
