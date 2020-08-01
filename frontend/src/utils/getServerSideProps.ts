import { GetServerSideProps } from "next";
import clientOnly from "@/resolvers/clientOnly";
import Routes from "./Routes";

// eslint-disable-next-line import/prefer-default-export
export const getServerSideProps:GetServerSideProps = async ({ req, res }) => {
  const props: Record<string, unknown> = { fbAppId: process.env.FACEBOOK_APP_ID };
  const { default: cache } = await import("@/cache");
  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  const visitingProtectedWithoutLoggingIn = Routes.some((route) => route.path === req.url && route.protected);
  const authRoutes = ["/login", "/signup"];

  if (!!data?.isLoggedIn && authRoutes.includes(req.url as string)) {
    res.writeHead(301, { Location: "/" });
    res.end();
  } else if (!data?.isLoggedIn && visitingProtectedWithoutLoggingIn) {
    res.writeHead(301, { Location: "/login" });
    res.end();
  }
  return { props };
};
