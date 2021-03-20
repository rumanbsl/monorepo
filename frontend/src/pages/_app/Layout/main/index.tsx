import { useQuery } from "@apollo/client";
import Router from "next/router";
import ProgressBar from "nprogress";
import styled from "styled-components";
import { USER_GET } from "@/Interfaces/gql-definitions";
import { rootLoadingInVar } from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import { ViewPortShape } from "@/utils/useWindowSize";
import SidebarComponent from "./SidebarComponent";

Router.events.on("routeChangeStart", () => { ProgressBar.start(); rootLoadingInVar(true); });
Router.events.on("routeChangeComplete", () => { ProgressBar.done(); rootLoadingInVar(false); });
Router.events.on("routeChangeError", () => { ProgressBar.done(); rootLoadingInVar(false); });

const Main = styled.div`
  column-gap: 5.7rem;
  display: flex;
  margin-top: 5.4rem;
  min-height: calc(100vh - 514px);

  @media screen and (max-width: 1110px) {
    padding: 1.6rem;
  }
`;

const MainComponent:React.FC<{viewport: ViewPortShape}> = ({ children, viewport }) => {
  const { data: clientResolver } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);

  const { data: userInfo } = useQuery<USER_GET>(serverOnly.Query.USER_GET, { skip: !clientResolver?.isLoggedIn });
  if (!userInfo?.USER_GET) return null;
  return (
    <Main>
      <SidebarComponent viewport={viewport} userInfo={userInfo.USER_GET} />
      {children}
    </Main>
  );
};

export default MainComponent;
