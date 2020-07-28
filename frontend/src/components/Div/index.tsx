import styled from "styled-components";
import {
  color, ColorProps,
  space, SpaceProps,
  layout, LayoutProps,
  grid, GridProps,
  flex, FlexProps,
} from "styled-system";
import { MyTheme } from "@/styles";

export interface DivProps extends ColorProps<MyTheme>,
SpaceProps<MyTheme>,
LayoutProps<MyTheme>,
FlexProps<MyTheme>,
GridProps<MyTheme>{}

const Div = styled.div<DivProps>`
  ${color}
  ${space}
  ${layout}
  ${flex}
  ${grid}
`;

export default Div;
