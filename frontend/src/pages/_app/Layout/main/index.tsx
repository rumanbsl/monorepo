import Router from "next/router";
import ProgressBar from "nprogress";
import styled from "styled-components";
import { USER_GET } from "@/Interfaces/gql-definitions";
import cache from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import { ViewPortShape } from "@/utils/useWindowSize";
import SidebarComponent from "./SidebarComponent";

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

const MainComponent:React.SFC<{viewport: ViewPortShape}> = ({ children, viewport }) => {
  const user = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  const userInfo = user?.isLoggedIn ? cache.readQuery<USER_GET>({ query: serverOnly.Query.USER_GET }) : null;
  return (
    <Main>
      {user?.isLoggedIn && userInfo?.USER_GET ? <SidebarComponent viewport={viewport} userInfo={userInfo.USER_GET} /> : null}
      {children}
    </Main>
  );
};

export default MainComponent;
