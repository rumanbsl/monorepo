import React from "react";
import BaseStyle from "@/styles/base";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/utils/apolloClient";
import { AppProps } from "next/app";
import Meta from "./Meta";
import Layout from "./Layout";

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
