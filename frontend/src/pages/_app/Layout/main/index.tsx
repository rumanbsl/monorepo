import { useQuery, useMutation, MutationUpdaterFn } from "@apollo/client";
import Router, { useRouter } from "next/router";
import ProgressBar from "nprogress";
import { useEffect } from "react";
import styled from "styled-components";
import { initializeCacheWithDefaultValue } from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import Routes from "@/utils/Routes";
import { setAccessToken } from "@/utils/accessToken";
import NavigationComponent from "./NavigationComponent";

Router.events.on("routeChangeStart", () => { ProgressBar.start(); });
Router.events.on("routeChangeComplete", () => { ProgressBar.done(); });
Router.events.on("routeChangeError", () => { ProgressBar.done(); });

const Main = styled.div`
  column-gap: 5.7rem;
  display: flex;
  margin-top: 5.4rem;
  min-height: calc(100vh - 514px);

  @media screen and (max-width: 1110px) {
    padding: 1.6rem;
  }
`;

const onLogout:MutationUpdaterFn<{USER_LOGOUT: boolean}> = (_, { data }) => {
  if (data?.USER_LOGOUT) {
    setAccessToken("");
    initializeCacheWithDefaultValue({ loggedOut: true });
  }
};

const MainComponent:React.SFC<unknown> = ({ children }) => {
  const [logout] = useMutation<{USER_LOGOUT: boolean}>(serverOnly.Mutation.USER_LOGOUT);
  const router = useRouter();
  const { data, error, loading } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);

  const visitingProtectedWithoutLoggingIn = Routes.some((route) => route.path === router.pathname && route.protected);
  const authRoutes = ["/login", "/signup"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!data?.isLoggedIn && visitingProtectedWithoutLoggingIn) {
        router.push("/login").then(console.log).catch(console.error);
      } else if (data?.isLoggedIn && authRoutes.includes(router.pathname)) {
        router.push("/").then(console.log).catch(console.error);
      }
    }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Oh no!</div>;

  if (!data?.isLoggedIn) {
    return visitingProtectedWithoutLoggingIn ? null : <Main>{children}</Main>;
  }

  return (
    <Main>
      <NavigationComponent router={router} onLogout={() => logout({ update: onLogout })} />
      {children}
    </Main>
  );
};

export default MainComponent;
