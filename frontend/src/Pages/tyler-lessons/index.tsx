import React from "react";
// import GithubUser from "@/modules/GithubUser";
// import CharLimit from "@/modules/CharLimit";
// import WaitDelay from "@/modules/WaitDelay";
// import Fetch from "@/modules/Fetch";
// import UseWait from "@/modules/useWait";
// import UseWindowDimension from "@/modules/useWindowDimension";
// import UseFetch from "@/modules/useFetch";
// import UseReducer from "@/modules/useReducer";
import { RouteProps } from "react-router-dom";
import UseRef from "@/Pages/tyler-lessons/components/useRef";

// export default (): JSX.Element => <GithubUser userName="rumanbsl" />;
// export default (): JSX.Element => <CharLimit />;
// export default (): JSX.Element => <WaitDelay />;
// export default (): JSX.Element => <Fetch />;
// export default (): JSX.Element => <UseWait />;
// export default (): JSX.Element => <UseWindowDimension />;
// export default (): JSX.Element => <UseFetch />;
// export default (): JSX.Element => <UseReducer />;
export default (prop: RouteProps): JSX.Element => {
  console.log(prop.match);
  return <UseRef />;
};
