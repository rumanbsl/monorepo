import styled, { DefaultTheme } from "styled-components";
import { darken, lighten } from "polished";
import { Variants } from "@/styles/colors";
import { color, ColorProps, space, SpaceProps, layout, LayoutProps } from "styled-system";
import { MyTheme } from "@/styles";

type VariantShape = (keyof Variants) | "outline" | "outline_invert";

interface Props extends ColorProps<MyTheme>, SpaceProps<MyTheme>, LayoutProps<MyTheme>{
  variant?: VariantShape
}

function getbg({ variant, theme }: { variant?: VariantShape, theme: DefaultTheme }) {
  if (!variant) return theme.colors.primary;
  if (variant === "outline") return "#fff";
  if (variant === "outline_invert") return "#000";
  return theme.colors[variant];
}
function getborder({ variant, theme }: { variant?: VariantShape, theme: DefaultTheme }) {
  if (!variant) return theme.colors.primary;
  if (variant === "outline") return `2px solid ${theme.colors.primary}`;
  if (variant === "outline_invert") return `2px solid ${theme.colors.primary_invert}`;
  return 0;
}
function getcolor({ variant, theme }: { variant?: VariantShape, theme: DefaultTheme }) {
  if (!variant) return theme.colors.primary;
  if (variant === "outline") return theme.colors.primary;
  if (variant === "outline_invert") return theme.colors.primary_invert;
  // @ts-expect-error
  if (variant.includes("invert")) return theme.colors[variant.substring(0, "varient_invert".indexOf("_"))]; // primary_invert => primary
  // @ts-expect-error
  return theme.colors[`${variant}_invert`]; // primary => primary_invert
}

const Button = styled.button<Props>`
  align-items: center;
  background: ${({ variant, theme }) => getbg({ variant, theme })};
  border: ${({ variant, theme }) => getborder({ variant, theme })};
  border-radius: 1.1rem;
  color: ${({ variant, theme }) => getcolor({ variant, theme })};
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 4.8rem;
  min-width: 9.2rem;
  transition: background 100ms ease-in, transform 100ms ease-in;

  &:active {
    background: ${({ variant, theme }) => darken(0.2, getbg({ variant, theme }))};
  }

  &:hover,
  &:focus {
    background: ${({ theme, variant }) => lighten(0.1, getbg({ variant, theme }))};
    outline: none;
  }

  ${color}
  ${space}
  ${layout}
`;

export default Button;
