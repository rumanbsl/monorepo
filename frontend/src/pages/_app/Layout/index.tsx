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

const LayoutComponent: NextPage = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Header />
      {/* Logic for rendering components based on login state is available in Main */}
      <Main>{children}</Main>
    </Layout>
  </ThemeProvider>
);

export default LayoutComponent;
