const variants = {
  primary        : "#5e8c61ff",
  primary_invert : "#fff",
  success        : "#94e8b4ff",
  success_invert : "#fff",
  warning        : "#f3b61f",
  warning_invert : "#000",
  error          : "#ff331fff",
  error_invert   : "#fff",
};

const typography = {
  link            : "#94e8b4ff",
  link_invert     : "#000",
  heading         : "#000",
  heading_invert  : "#fff",
  text            : "#000",
  text_invert     : "#fff",
  disabled        : "#fff",
  disabled_invert : "#222",
};

const colors = {
  ...variants,
  ...typography,
} as const;

export type Typography = typeof typography;
export type Variants = typeof variants;
export default colors;
