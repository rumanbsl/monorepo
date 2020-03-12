import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Routes from "./Routes";

export default (): JSX.Element => (
  <section>
    <BrowserRouter>
      <nav>
        <ul className="navbar">
          {Routes
            .filter((route) => route.show)
            .map(({ title, path }) => (
              <li key={path}>
                <Link to={path}>
                  {title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {Routes.map((route) => <Route {...route} key={route.path} />)}
    </BrowserRouter>
  </section>
);
