const routes = [
  { path: "/", protected: true, navItem: true },
  { path: "/dashboard", protected: true, navItem: true },
  { path: "/logout", protected: true, navItem: true },
  { path: "/login" },
] as const;

interface RouteShape {
  path: typeof routes[number]["path"];
  protected?: boolean;
  navItem?: boolean;
}

export default routes as Readonly<RouteShape[]>;
