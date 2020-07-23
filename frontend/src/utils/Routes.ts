const routes = [
  { path: "/" },
  { path: "/sell", protected: true },
] as const;

interface RouteShape {
  path: typeof routes[number]["path"];
  protected?: boolean;
}

export default routes as Readonly<RouteShape[]>;
