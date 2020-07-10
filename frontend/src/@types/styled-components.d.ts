import { MyTheme } from "@/styles";

declare module "styled-components" {
  // eslint-disable-next-line
  export interface DefaultTheme extends MyTheme {}
}
