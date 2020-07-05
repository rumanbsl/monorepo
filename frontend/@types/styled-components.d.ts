import { MyTheme } from "styles/index";

declare module "styled-components" {
  // eslint-disable-next-line
  export interface DefaultTheme extends MyTheme {}
}
