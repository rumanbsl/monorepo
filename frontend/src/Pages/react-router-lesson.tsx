import React from "react";
import { useRouteMatch } from "react-router-dom";

export default (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <div>
      <h2>Router lesson</h2>
      {JSON.stringify(match)}
    </div>
  );
};
