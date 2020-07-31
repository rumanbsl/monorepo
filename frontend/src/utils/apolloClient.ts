import { ApolloClient, NormalizedCacheObject, ApolloLink, Observable, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import fetch from "isomorphic-unfetch";
import jwtDecode from "jwt-decode";
import { useMemo } from "react";
import cache from "@/cache";
import { getAccessToken, setAccessToken } from "./accessToken";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const authLink = setContext((_, { headers, ...context }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      ...(accessToken ? { "x-auth": `Bearer ${accessToken}` } : {}),
    },
    ...context,
  };
});
const httpLink = createHttpLink({
  uri         : "http://localhost/graphql",
  credentials : "same-origin",
  fetch,
});

const requestLink = new ApolloLink(
  (operation, forward) => new Observable((observer) => {
    let handle: any;
    Promise.resolve(operation)
      .then((op) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          op.setContext({ headers: { "x-auth": `Bearer ${accessToken}` } });
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next     : observer.next.bind(observer),
          error    : observer.error.bind(observer),
          complete : observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  }),
);

const link = ApolloLink.from([
  new TokenRefreshLink({
    accessTokenField        : "accessToken",
    isTokenValidOrUndefined : () => {
      const token = getAccessToken();

      if (!token) { return true; }
      const decoded = jwtDecode(token);
      if (typeof decoded?.exp !== "number") return false;
      return Date.now() < decoded.exp * 1000;
    },
    fetchAccessToken : () => fetch("/api/v1/refresh-token", { method: "POST" }),
    handleFetch      : (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },

  }),
  requestLink,
  // @ts-ignore
  authLink.concat(httpLink),
]);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache,
    link,
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
