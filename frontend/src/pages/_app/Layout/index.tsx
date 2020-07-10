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

export default (({ children }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Header />
      <Main>{children}</Main>
    </Layout>
  </ThemeProvider>
)) as NextPage;
