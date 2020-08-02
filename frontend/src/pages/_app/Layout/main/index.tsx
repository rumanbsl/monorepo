import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import ProgressBar from "nprogress";
import styled from "styled-components";
import clientOnly from "@/resolvers/clientOnly";
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

const MainComponent:React.SFC<unknown> = ({ children }) => {
  const router = useRouter();
  const { data } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);
  return (
    <Main>
      {data?.isLoggedIn && <NavigationComponent router={router} />}
      {children}
    </Main>
  );
};

export default MainComponent;
