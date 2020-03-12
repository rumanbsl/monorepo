import React, { useState, useEffect } from "react";

interface WaitPropTypes { delay: number; placeholder: JSX.Element; ui: JSX.Element }
/**
 * @description
 * @param {*} { delay = 1000, placeholder, ui }
 * @returns {JSX.Element}
 */
function Wait({ delay = 1000, placeholder, ui }: WaitPropTypes): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(placeholder);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveComponent(ui);
    }, delay);
    return (): void => clearTimeout(timer);
  }, [delay, ui]);

  return activeComponent;
}
export default (): JSX.Element => (
  <Wait
    delay={3000}
    placeholder={<p>Waiting...</p>}
    ui={<p>This text should appear after 3 seconds.</p>}
  />
);
/*
  Instructions:
    You'll notice below that we have a Wait component.
    The purpose of Wait is to render the `ui` prop after
    `delay` seconds. Before `delay` seconds, it should
    render `placeholder`.
*/
