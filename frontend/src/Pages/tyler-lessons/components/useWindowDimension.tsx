import React, { useState, useEffect } from "react";

interface Dimensions {
  width: number;
  height: number;
}

/**
 * @description
 * @param {number} [delay=1000]
 */
function useWindowDimensions(): Dimensions {
  const [windowDimensions, setWindowDimensions] = (
    useState<Dimensions>({ width: window.innerWidth, height: window.innerHeight })
  );
  const listener = (): void => { setWindowDimensions({ width: window.innerWidth, height: window.innerHeight }); };
  useEffect(() => {
    window.addEventListener("resize", listener);
    return (): void => window.removeEventListener("resize", listener);
  }, []);
  return windowDimensions;
}

export default (): JSX.Element => {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <span>{`height: ${height}`}</span>
      <span>{`width: ${width}`}</span>
    </div>
  );
};
