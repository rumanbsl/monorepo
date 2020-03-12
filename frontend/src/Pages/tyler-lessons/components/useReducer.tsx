import React, { useReducer } from "react";

interface Action {
  type: "Increment" | "Decrement" | "Reset";
}
/**
 * @description
 * @param {number} state
 * @param {number} value
 * @returns {number}
 */
function reducer(state: number | undefined, action: Action): number | undefined {
  if (typeof state !== "number") return 0;
  switch (action.type) {
  case "Increment": {
    return state + 1;
  }
  case "Decrement": {
    return state - 1;
  }
  case "Reset": {
    return 0;
  }
  default: throw new Error();
  }
}

export default (): JSX.Element => {
  const [count, dispatch] = useReducer(reducer, undefined);

  return (
    <div>
      <button type="button" onClick={(): void => dispatch({ type: "Increment" })}>Increment</button>
      <button type="button" onClick={(): void => dispatch({ type: "Decrement" })}>Decrement</button>
      <button type="button" onClick={(): void => dispatch({ type: "Reset" })}>Reset</button>
      {count}
    </div>
  );
};
