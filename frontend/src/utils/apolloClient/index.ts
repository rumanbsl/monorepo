import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import cache from "@/cache";
import link from "./link";

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isServer = () => typeof window === "undefined";

function createApolloClient(token?: string) {
  return new ApolloClient({
    ssrMode : isServer(),
    cache,
    link    : link(token),
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject, token?: string) {
  const _apolloClient = apolloClient ?? createApolloClient(token);
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (isServer()) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: NormalizedCacheObject, token?: string) {
  const store = useMemo(() => initializeApollo(initialState, token), [initialState, token]);
  return store;
}
