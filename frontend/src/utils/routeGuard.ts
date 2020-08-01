import clientOnly from "@/resolvers/clientOnly";
import Routes from "./Routes";

const routeGuard = async ({ req, res }: any) => {
  const props: Record<string, unknown> = { fbAppId: process.env.FACEBOOK_APP_ID };
  const { default: cache } = await import("@/cache");
  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  const visitingProtectedWithoutLoggingIn = Routes.some((route) => route.path === req.url && route.protected);
  const authRoutes = ["/login", "/signup"];

  if (!!data?.isLoggedIn && authRoutes.includes(req.url as string)) {
    res.writeHead(301, { Location: "/dashboard" });
    res.end();
  } else if (!data?.isLoggedIn && visitingProtectedWithoutLoggingIn) {
    res.writeHead(301, { Location: "/login" });
    res.end();
  } else if (req.url !== "/favicon.ico") {
    const unknownRoutes = (!authRoutes.includes(req.url) && !Routes.find((r) => r.path === req.url));
    if (!data?.isLoggedIn && unknownRoutes) {
      res.writeHead(301, { Location: "/login" });
      res.end();
    } else if (data?.isLoggedIn && unknownRoutes) {
      res.writeHead(301, { Location: "/dashboard" });
      res.end();
    }
  }
  return { props };
};

export default routeGuard;
