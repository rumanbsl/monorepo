import { ApolloProvider } from "@apollo/client";
import cookie from "cookie";
import nodeFetch from "isomorphic-unfetch";
import { AppContext } from "next/app";
import React from "react";
import cache from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import BaseStyle from "@/styles/base";
import { setAccessToken, getAccessToken } from "@/utils/accessToken";
import { useApollo, initializeApollo } from "@/utils/apolloClient";
import Layout from "./Layout";
import Meta from "./Meta";

const MyApp = ({ Component, pageProps = {}, initialApolloState, accessToken }: any) => {
  if (accessToken) setAccessToken(accessToken);
  pageProps.initialApolloState = initialApolloState || pageProps.initialApolloState;
  const apolloClient = useApollo(initialApolloState);
  const data = apolloClient.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  return (
    <ApolloProvider client={apolloClient}>
      <Meta />
      <Layout isLoggedIn={!!data?.isLoggedIn}>
        <Component {...pageProps} />
      </Layout>
      <BaseStyle />
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  let accessToken = getAccessToken();
  try {
    if (typeof ctx.req?.headers.cookie === "string") {
      const token = cookie.parse<{"refresh-token": string}>(ctx.req.headers.cookie);
      const parsedToken = await (await nodeFetch("http://backend:3000/api/v1/refresh-token", {
        method  : "POST",
        headers : { cookie: `refresh-token=${token["refresh-token"]}` },
      })).json();
      accessToken = parsedToken.accessToken;
    }
    await cache.reset();

    if (accessToken) {
      cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
      const client = initializeApollo(cache.extract(), accessToken);
      await client.query({ query: serverOnly.Query.USER_GET, fetchPolicy: "network-only" });
      setAccessToken(accessToken);
    }
  } catch (err) {
    console.log(err);
    setAccessToken("");
    cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: false } });
  }
  return { initialApolloState: cache.extract(), accessToken };
};

export default MyApp;
