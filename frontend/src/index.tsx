/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// eslint-disable-next-line react/no-render-return-value
const render = (Component: any): void => ReactDOM.render(<Component />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render(App);
if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    // eslint-disable-next-line global-require
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
