import breakpoints from "./breakpoints";
import colors from "./colors";
import space from "./spacing";
import typography from "./typography";

const theme = {
  breakpoints,
  colors,
  space,
  typography,
} as const;

export default theme;
export type MyTheme = typeof theme;
