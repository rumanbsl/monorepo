import { useMemo } from "react";
import { ApolloClient, NormalizedCacheObject, createHttpLink, ApolloLink } from "@apollo/client";
import cache from "@/cache";
import fetch from "isomorphic-unfetch";
import { setContext } from "@apollo/link-context";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    if (token) headers["X-AUTH"] = `Bearer ${token}`;
    return headers;
  });
  const link = createHttpLink({
    uri         : "http://localhost/graphql",
    credentials : "same-origin",
    fetch,
  }).concat(authLink as unknown as ApolloLink);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache,
    link,
  });
}

export function initializeApollo(initialState?:NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?:NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
