import { useMutation, MutationUpdaterFn, useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import ProgressBar from "nprogress";
import styled from "styled-components";
import { initializeCacheWithDefaultValue } from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
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

const onLogout:MutationUpdaterFn<{USER_LOGOUT: boolean}> = async (_, { data }) => {
  if (data?.USER_LOGOUT) {
    await initializeCacheWithDefaultValue(false);
    setAccessToken("");
  }
};
const MainComponent:React.SFC<unknown> = ({ children }) => {
  const router = useRouter();
  const { data } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);
  const [logout, { data: loggedOutData }] = useMutation<{USER_LOGOUT: boolean}>(serverOnly.Mutation.USER_LOGOUT);
  if (loggedOutData?.USER_LOGOUT) {
    window.location.href = "/login";
    return null;
  }
  return (
    <Main>
      {data?.isLoggedIn && <NavigationComponent router={router} onLogout={() => logout({ update: onLogout })} />}
      {children}
    </Main>
  );
};

export default MainComponent;
