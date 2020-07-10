import React from "react";
import NextApp from "next/app";
import BaseStyle from "@/styles/base";
import Provider from "@/utils/Provider";
import Layout from "./Layout";
import Meta from "./Meta";
/**
 * @description The Root component
 * @export
 * @class TailwindApp
 * @extends {App}
 */
export default class App extends NextApp{
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider>
        <Meta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <BaseStyle />
      </Provider>
    );
  }
}
