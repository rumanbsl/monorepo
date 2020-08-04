import React, { useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Variants } from "@/styles/colors";
import Div from "../Div";

interface PopperElementProps {
  reference: React.Dispatch<React.SetStateAction<any>>;
  style: React.CSSProperties;
  popperColor: keyof Variants;
}

const PopperElementStyled = styled(Div)<{popperColor: keyof Variants}>`
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
const ArrowElementStyled = styled(Div)<{popperColor: keyof Variants}>`
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

const PopperElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => (
  <PopperElementStyled ref={reference} {...prop} />
);
const ArrowElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => (
  <ArrowElementStyled id="arrow" data-popper-arrow ref={reference} {...prop} />
);

interface DropDownProps {
  activator: React.ReactElement;
  component: React.ReactNode;
  withArrow?: boolean;
  popperColor?: keyof Variants;
}

const PopperBase: React.SFC<DropDownProps> = ({ activator, popperColor, component, withArrow = false }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement, {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 8] } },
      ],
    },
  );

  const Activator = React.cloneElement(activator, { ref: setReferenceElement });
  return (
    <div>
      {Activator}
      <PopperElement reference={setPopperElement} popperColor={popperColor || "primary"} style={styles.popper} {...attributes.popper}>
        {withArrow && <ArrowElement reference={setArrowElement} popperColor={popperColor || "primary"} style={styles.arrow} />}
        {component}
      </PopperElement>
    </div>
  );
};

export default PopperBase;
