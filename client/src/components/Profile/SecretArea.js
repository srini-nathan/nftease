import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import {
  useUserLazyQuery,
  useLoginMutation,
  useNewUserMutation,
} from "../../generated/graphql";
import { Button } from "reactstrap";

const SecretArea = () => {
  //   const history = useHistory();

  //   if (!Cookies.get("token")) {
  //     history.push("/login");
  //   }
  const logout = (e) => {
    Cookies.remove("token");
    window.location.href = "/";
    // return false;
  };

  return (
    <div>
      <Button
        onClick={function (event) {
          logout();
        }}
      >
        Logout
      </Button>
      <p>hey</p>
    </div>
  );
};
export default SecretArea;
