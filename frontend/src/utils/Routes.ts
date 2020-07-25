const routes = [
  { path: "/", protected: true, navItem: true },
  { path: "/sell", protected: true, navItem: true },
  { path: "/login" },
] as const;

interface RouteShape {
  path: typeof routes[number]["path"];
  protected?: boolean;
  navItem?: boolean;
}

export default routes as Readonly<RouteShape[]>;
