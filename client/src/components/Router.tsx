import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Login from "./Login/Login";
import "../assets/css/bootstrap.min.css";
import "../assets/css/paper-kit.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
