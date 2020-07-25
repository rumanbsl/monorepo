import styled from "styled-components";
import ProgressBar from "nprogress";
import Router, { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import Routes from "@/utils/Routes";
import { useQuery, useMutation, MutationUpdaterFn } from "@apollo/client";
import clientOnly from "@/resolvers/clientOnly";
import { useEffect } from "react";
import serverOnly from "@/resolvers/serverOnly";
import { setAccessToken } from "@/utils/accessToken";
import { initializeCacheWithDefaultValue } from "@/cache";

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

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 22.2rem;

  > * {
    align-items: center;
    background: #f8f8f8;
    border-radius: 1.3rem;
    color: inherit;
    display: inline-flex;
    font-size: 1.4rem;
    font-style: italic;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    height: 7.7rem;
    letter-spacing: -0.8px;
    padding: 1.8rem 2.6rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: transform 100ms ease-in, background 100ms ease-in;

    &:hover,
    &:focus {
      transform: scale(1.05);
    }

    &.active {
      background: #a38de3;
      color: #fde0ff;
    }

    &.home {
      height: 4.6rem;
    }
  }

  > button {
    border: 0;
    cursor: pointer;
  }
`;
interface NavigationProps {
  router: NextRouter;
  onLogout: () => void;
}

const setup = {
  components: {
    NavigationComponent({ router, onLogout }: NavigationProps) {
      const className = (route: typeof Routes[number]) => {
        const returnable: string[] = [];
        if (route.path === "/") returnable.push("home");
        if (router.pathname === route.path) returnable.push("active");
        return returnable.join(" ");
      };
      return (
        <Navigation>
          {Routes.filter((route) => route.navItem).map((route, i) => (
            <Link href={route.path} key={i}>
              <a className={className(route)}>{route.path === "/" ? "home" : route.path.substring(1)}</a>
            </Link>
          ))}
          <button type="button" onClick={onLogout}>logout</button>
        </Navigation>
      );
    },
  },
  methods: {
    onLogout(_, { data }) {
      if (data?.USER_LOGOUT) {
        setAccessToken("");
        initializeCacheWithDefaultValue({ loggedOut: true });
      }
    },
  } as {onLogout: MutationUpdaterFn<{USER_LOGOUT: boolean}>},
};

export default function MainComponent({ children }: { children: React.ReactNode }) {
  const [logout] = useMutation<{USER_LOGOUT: boolean}>(serverOnly.Mutation.USER_LOGOUT);
  const router = useRouter();
  const { data, error, loading } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);

  const visitingProtectedWithoutLoggingIn = Routes.some((route) => route.path === router.pathname && route.protected);
  const authRoutes = ["login", "signup"];

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
      <setup.components.NavigationComponent
        router={router}
        onLogout={() => logout({ update: setup.methods.onLogout })}
      />
      {children}
    </Main>
  );
}
