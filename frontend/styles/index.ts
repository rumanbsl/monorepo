import typography from "./typography";

const theme = { ...typography } as const;

export default theme;
export type MyTheme = typeof theme;
