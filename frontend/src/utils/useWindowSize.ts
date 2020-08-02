/* eslint-disable react-hooks/rules-of-hooks */
// https://usehooks.com/useWindowSize/
import { useState, useEffect } from "react";

export interface ViewPortShape { width: number, height: number }

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<ViewPortShape>({
    width  : 0,
    height : 0,
  });
  if (typeof window !== "undefined") {
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width  : window.innerWidth,
          height : window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  }

  return windowSize;
}
