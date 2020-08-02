import styled, { ThemeProvider } from "styled-components";
import theme from "@/styles";
import { ViewPortShape } from "@/utils/useWindowSize";
import Header from "./header";
import Main from "./main";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 111rem;
`;

const LayoutComponent: React.SFC<{viewport: ViewPortShape}> = ({ children, viewport }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      {viewport.width > 800 && <Header />}
      <Main viewport={viewport}>{children}</Main>
    </Layout>
  </ThemeProvider>
);

export default LayoutComponent;
