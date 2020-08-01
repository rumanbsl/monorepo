import { ApolloLink, createHttpLink, Observable } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import nodeFetch from "isomorphic-unfetch";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "../accessToken";

const isServer = () => typeof window === "undefined";
const Fetch = isServer() ? nodeFetch : fetch;

const headers = (token?:string) => {
  const accessToken = token || getAccessToken();
  const auth: Record<string, unknown> = { ...(accessToken ? { "x-auth": `Bearer ${accessToken}` } : {}) };
  return auth;
};

const createHttpAnfReqLinks = (token?:string) => [
  new ApolloLink(
    (operation, forward) => new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((op) => {
          op.setContext({ headers: headers(token) });
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
  ),
  createHttpLink({
    uri         : isServer() ? "http://backend:3000/graphql" : "http://localhost/graphql",
    credentials : "same-origin",
    fetch       : Fetch,
    headers     : headers(token),
  }),
];

const link = (_token?: string) => ApolloLink.from([
  new TokenRefreshLink({
    accessTokenField        : "accessToken",
    isTokenValidOrUndefined : () => {
      const token = isServer() ? _token : getAccessToken();

      if (!token) { return true; }
      const decoded = jwtDecode(token);
      if (typeof decoded?.exp !== "number") return false;
      return Date.now() < decoded.exp * 1000;
    },
    fetchAccessToken : () => Fetch("http://backend:3000/api/v1/refresh-token", { method: "POST" }),
    handleFetch      : (token) => {
      setAccessToken(token);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },

  }),
  ...createHttpAnfReqLinks(_token),
]);

export default link;
