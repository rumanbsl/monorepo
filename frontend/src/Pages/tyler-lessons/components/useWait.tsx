import React, { useState, useEffect } from "react";

/**
 * @description
 * @param {number} [delay=1000]
 */
function useWait(delay = 1000): boolean {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    return (): void => clearTimeout(timer);
  }, [delay, show]);
  return show;
}
/**
 * @description
 * @param {{ delay: number; ui: JSX.Element; placeholder: JSX.Element }} { delay, ui, placeholder }
 * @returns {JSX.Element}
 */
function Wait({ delay, ui, placeholder }:
  { delay: number; ui: JSX.Element; placeholder: JSX.Element }): JSX.Element {
  const show = useWait(delay);

  return show ? ui : placeholder;
}

export default (): JSX.Element => (
  <Wait delay={3000} placeholder={<p>Loading...</p>} ui={<p>I am UI</p>} />
);
