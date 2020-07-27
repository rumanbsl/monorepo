import styled from "styled-components";
import { color, ColorProps, space, SpaceProps, layout, LayoutProps } from "styled-system";
import { MyTheme } from "@/styles";

interface Props extends ColorProps<MyTheme>, SpaceProps<MyTheme>, LayoutProps<MyTheme>{}

const Div = styled.div<Props>`
  ${color}
  ${space}
  ${layout}
`;

export default Div;
