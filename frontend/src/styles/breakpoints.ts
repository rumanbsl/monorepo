/* eslint-disable prefer-destructuring */
const breakpoints = ["319px", "424px", "767px", "1023px"] as any;

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export default breakpoints as {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  _: string;
};
