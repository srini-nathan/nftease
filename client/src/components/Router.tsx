import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login/Login";
import Profile from "./Profile";
import SelectCreate from "./Create";
import CreateContent from "./Create/CreateContent";
import SecretArea from "./Profile/SecretArea";
import "../assets/css/bootstrap.min.css";
import "../assets/css/paper-kit.css";
import Auth from "./Authentication/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route
            path="/profile"
            render={(props) => (
              <Auth>
                <Profile />
              </Auth>
            )}
          ></Route>
          <Route exact path="/create" component={SelectCreate} />
          <Route exact path="/create/newErc721" component={CreateContent} />
          <Route
            path="/secret-area"
            render={(props) => (
              <Auth>
                <SecretArea />
              </Auth>
            )}
          ></Route>
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
