import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import React from "react";
import BaseStyle from "@/styles/base";
import { useApollo } from "@/utils/apolloClient";
import Layout from "./Layout";
import Meta from "./Meta";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps?.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Meta />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <BaseStyle />
    </ApolloProvider>
  );
}
