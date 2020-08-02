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

const LayoutComponent: React.SFC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Header />
      <Main>{children}</Main>
    </Layout>
  </ThemeProvider>
);

export default LayoutComponent;
