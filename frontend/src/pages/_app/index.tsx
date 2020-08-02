import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import cookie from "cookie";
import nodeFetch from "isomorphic-unfetch";
import { AppContext, AppProps } from "next/app";
import React from "react";
import cache, { initializeCacheWithDefaultValue } from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import BaseStyle from "@/styles/base";
import { setAccessToken, getAccessToken } from "@/utils/accessToken";
import { useApollo, initializeApollo } from "@/utils/apolloClient";
import routeGuard from "@/utils/routeGuard";
import useWindowSize from "@/utils/useWindowSize";
import Layout from "./Layout";
import Meta from "./Meta";

interface ApplicationPropsShape extends AppProps {
  initialApolloState: NormalizedCacheObject;
  accessToken: string;
  fbAppId: string;
}

const MyApp = (props: ApplicationPropsShape) => {
  const { Component, pageProps = {}, initialApolloState, accessToken, fbAppId } = props;
  const viewport = useWindowSize();
  // setting localstorage x-auth, bit redundant, but needed
  if (accessToken && !getAccessToken()) setAccessToken(accessToken);
  pageProps.initialApolloState = initialApolloState || pageProps.initialApolloState;
  pageProps.fbAppId = fbAppId;

  const apolloClient = useApollo(initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Meta />
      <Layout viewport={viewport}>
        <Component {...pageProps} />
      </Layout>
      <BaseStyle />
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  let accessToken = getAccessToken();
  await initializeCacheWithDefaultValue(!!accessToken);
  let returnable: Record<string, unknown> = { fbAppId: process.env.FACEBOOK_APP_ID };
  try {
    if (typeof ctx.req?.headers.cookie === "string") {
      const token = cookie.parse<{"refresh-token": string}>(ctx.req.headers.cookie);
      const parsedToken = await (await nodeFetch("http://backend:3000/api/v1/refresh-token", {
        method  : "POST",
        headers : { cookie: `refresh-token=${token["refresh-token"]}` },
      })).json();
      accessToken = parsedToken.accessToken;
    }

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
  if (ctx.req && ctx.res) {
    returnable = {
      ...returnable,
      ...routeGuard({ req: ctx.req, res: ctx.res }),
    };
  }
  returnable = { ...returnable, initialApolloState: cache.extract(), accessToken };
  return returnable;
};

export default MyApp;
