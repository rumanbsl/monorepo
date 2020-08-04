import styled from "styled-components";
import { Variants } from "@/styles/colors";
import Div from "../Div";

export interface PopperElementProps {
  reference: React.Dispatch<React.SetStateAction<any>>;
  style: React.CSSProperties;
  popperColor: keyof Variants;
}

export const PopperElementStyled = styled(Div)<{popperColor: keyof Variants}>`
  background: ${({ popperColor, theme }) => theme.colors[popperColor]};
  border: 1px solid #eaeaea;
  border-radius: 4px;
  color: ${({ popperColor, theme }) => (theme.colors as Record<string, string>)[`${popperColor}_invert`]};
  font-size: 13px;
  padding: 4px 8px;

  &[data-popper-placement^="top"] > #arrow {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > #arrow {
    top: -4px;
  }

  &[data-popper-placement^="left"] > #arrow {
    right: -4px;
  }

  &[data-popper-placement^="right"] > #arrow {
    left: -4px;
  }
`;
export const ArrowElementStyled = styled(Div)<{popperColor: keyof Variants}>`
  &,
  &:before {
    height: 8px;
    position: absolute;
    width: 8px;
    z-index: -1;
  }

  &:before {
    background: ${({ popperColor, theme }) => theme.colors[popperColor]};
    content: "";
    transform: rotate(45deg);
  }
`;
