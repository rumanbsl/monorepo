import { NextPage } from "next";
import styled, { ThemeProvider } from "styled-components";
import theme from "@/styles";
import Header from "./header";
import Main from "./main";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 111rem;
`;

const LayoutComponent: NextPage<{isLoggedIn: boolean;}> = ({ children, isLoggedIn }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Header />
      <Main isLoggedIn={isLoggedIn}>{children}</Main>
    </Layout>
  </ThemeProvider>
);

export default LayoutComponent;
