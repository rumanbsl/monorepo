import { useMemo } from "react";
import { ApolloClient, NormalizedCacheObject, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import cache from "@/cache";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const link = createHttpLink({
    // https://github.com/zeit/next.js/blob/master/examples/with-custom-reverse-proxy/package.json if needed
    // "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn"
    uri         : "http://localhost:3000/graphql",
    credentials : "same-origin", // include | same-origin
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    if (headers) {
      const token = localStorage.getItem("token");
      if (token) headers.authorization = `Bearer ${token}`;
    }
    return headers;
  });
  return new ApolloClient({
    ssrMode : typeof window === "undefined",
    cache,
    // @ts-expect-error
    link    : authLink.concat(link),
  });
}

export function initializeApollo(initialState?:NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?:NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
