import React, { useState, ReactElement } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import Div from "../Div";

interface PopperElementProps {
  reference: React.Dispatch<React.SetStateAction<any>>;
  style: React.CSSProperties
}

const PopperElementStyled = styled(Div)`
  background: #333;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
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
const ArrowElementStyled = styled(Div)`
  &,
  &:before {
    height: 8px;
    position: absolute;
    width: 8px;
    z-index: -1;
  }

  &:before {
    background: #333;
    content: "";
    transform: rotate(45deg);
  }
`;

const PopperElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => <PopperElementStyled ref={reference} {...prop} />;
const ArrowElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => <ArrowElementStyled id="arrow" data-popper-arrow ref={reference} {...prop} />;

const DropDown: React.SFC<{children: ReactElement}> = ({ children }) => {
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

  const RefElement = React.cloneElement(children, { ref: setReferenceElement });
  return (
    <>
      {RefElement}
      <PopperElement reference={setPopperElement} style={styles.popper} {...attributes.popper}>
        <ArrowElement reference={setArrowElement} style={styles.arrow} />
        Popper element
      </PopperElement>
    </>
  );
};

// const dd = ()=><DropDown><p>hello</p></DropDown>
export default DropDown;
