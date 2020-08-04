import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import { Variants } from "@/styles/colors";
import useClickOutside from "@/utils/useClickOutside";
import { PopperElementProps, PopperElementStyled, ArrowElementStyled } from "./styles";

const PopperElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => (
  <PopperElementStyled ref={reference} {...prop} />
);
const ArrowElement: React.SFC<PopperElementProps> = ({ reference, ...prop }) => (
  <ArrowElementStyled id="arrow" data-popper-arrow ref={reference} {...prop} />
);

interface PopperBaseProps {
  activator: React.ReactElement;
  component: React.ReactNode;
  withArrow?: boolean;
  popperColor?: keyof Variants;
  activeOn?: "click" | "hover"
}

const listeners = (activeOn: PopperBaseProps["activeOn"], state: boolean, toggleVisibility:(value: React.SetStateAction<boolean>) => void) => {
  switch (activeOn) {
  case "click": return {
    onClick : () => toggleVisibility(!state),
    onBlur  : () => toggleVisibility(false),

  };
  case "hover":
  default: return {
    onMouseOver : () => toggleVisibility(true),
    onMouseOut  : () => toggleVisibility(false),
  };
  }
};

const PopperBase: React.SFC<PopperBaseProps> = (props) => {
  const { activeOn, activator, popperColor, component, withArrow = false } = props;
  const [visibility, setVisibility] = useState(false);
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

  const Activator = React.cloneElement(activator, { ref: setReferenceElement, ...listeners(activeOn, visibility, setVisibility) });
  const PopperRef = useRef(null);
  useClickOutside(PopperRef, () => { setVisibility(false); });
  return (
    <div ref={PopperRef}>
      {Activator}
      <motion.div animate={{ opacity: visibility ? 1 : 0 }}>
        {visibility && (
          <PopperElement reference={setPopperElement} popperColor={popperColor || "primary"} style={styles.popper} {...attributes.popper}>
            {withArrow && <ArrowElement reference={setArrowElement} popperColor={popperColor || "primary"} style={styles.arrow} />}
            {component}
          </PopperElement>
        )}
      </motion.div>
    </div>
  );
};

export default PopperBase;
