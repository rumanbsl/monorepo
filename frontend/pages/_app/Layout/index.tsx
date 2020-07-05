import { NextPage } from "next";
import styled, { ThemeProvider } from "styled-components";
import theme from "styles";
import Header from "./header";
import Main from "./main";
import Hero from "./hero";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 111rem;
`;

const LoggedIn = false;

export default (({ children }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      { LoggedIn ? (
        <>
          <Header />
          <Hero />
          <Main>{children}</Main>
        </>
      ) : (
        <div>
          {children}
        </div>
      ) }
    </Layout>
  </ThemeProvider>
)) as NextPage;
