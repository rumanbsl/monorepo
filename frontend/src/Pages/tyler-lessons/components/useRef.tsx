import React, { useRef, useState, useEffect } from "react";

export default (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const id = useRef<NodeJS.Timeout | undefined>(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clear = (): void => { if (id.current) clearTimeout(id.current); };

  useEffect(() => {
    id.current = setTimeout(() => setCount((val) => val + 1), 1000);
    return clear;
  }, [clear, id]);
  return (
    <>
      <p>{count}</p>
      <button type="button" onClick={clear}>Pause</button>
    </>
  );
};
