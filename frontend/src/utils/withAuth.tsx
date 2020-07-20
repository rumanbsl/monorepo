import { NextPage } from "next";
import Router from "next/router";
import cache from "@/cache";
import clientOnly from "@/resolvers/clientOnly";

export default async function WithAuth(Page: NextPage) {
  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  if (!data?.isLoggedIn) {
    await Router.replace("/login");
    return null;
  }
  return <Page />;
}
