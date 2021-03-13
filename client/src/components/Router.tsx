import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Login from "./Login/Login";
import Profile from "./Profile";
import SelectCreate from "./Create";
import CreateContent from "./Create/CreateContent";

import "../assets/css/bootstrap.min.css";
import "../assets/css/paper-kit.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/create" component={SelectCreate} />
          <Route exact path="/create/newErc721" component={CreateContent} />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
