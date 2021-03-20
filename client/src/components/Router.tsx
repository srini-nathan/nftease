import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login/Login";
import Profile from "./Profile";
import Marketplace from "./Marketplace";
import SelectCreate from "./Create";
import CreateContent from "./Create/CreateContent";
import SecretArea from "./Profile/SecretArea";
import "../assets/css/bootstrap.min.css";
import "../assets/css/paper-kit.css";
import Auth from "./Authentication/Auth";
import Purchase from "./Purchase"

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
          <Route
            exact
            path="/marketplace"
            render={(props) => (
              <Auth>
                <Marketplace />
              </Auth>
            )}
          ></Route>
          <Route
            exact
            path="/create"
            render={(props) => (
              <Auth>
                <SelectCreate />
              </Auth>
            )}
          ></Route>
          <Route
            exact
            path="/create/newErc721"
            render={(props) => (
              <Auth>
                <CreateContent />
              </Auth>
            )}
          ></Route>
           <Route
            path={["/content/", "/content/:id"]} 
            component={Purchase}
            />

          {/* <Route exact path="/create/newErc721" component={CreateContent} /> */}
          <Route
            exact
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
