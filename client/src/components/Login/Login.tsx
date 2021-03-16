import React, { useState, useEffect } from "react";
import Background from "../../assets/img/login-image.jpg";
import Particle from "../../assets/animation/particles";
import "../../assets/css/paper-kit.css";
import MaskSVG from "../../assets/img/metamask.svg";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import {
  useUserLazyQuery,
  useLoginMutation,
  useNewUserMutation,
} from "../../generated/graphql";

import Web3 from "web3";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
} from "reactstrap";
import { UserClass } from "../../generated/graphql";

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export function Login() {
  const [state, setState] = useState({
    buttonClicked: false,
    walletAddress: "",
    waitLoad: "Please wait..",
    isAuthenticated: false,
  });

  // useEffect(() => {
  //   if (
  //     document.cookie.split(";").some(function (item) {
  //       return item.trim().indexOf("token=") == 0;
  //     })
  //   ) {
  //     setState({ ...state, isAuthenticated: true });
  //   }
  // }, [state]);

  const history = useHistory();

  const [userState, setUser] = useState<UserClass | null>(null);

  const [createUser, newUserResponse] = useNewUserMutation();

  const [getUser, { data, loading, error }] = useUserLazyQuery();

  const [handleLogin, loginResponse] = useLoginMutation();

  useEffect(() => {
    if (data && data.user == null && state.walletAddress) {
      createUser({
        variables: {
          data: {
            walletAddress: state.walletAddress,
            username: Math.random().toString(),
          },
        },
      });
    }
  }, [data, state]);

  // Set user (once button click)
  // Call handleSignMessage
  useEffect(() => {
    if (Cookies.get("token")) {
      setState({ ...state, isAuthenticated: true });
    }
    if (data?.user) {
      setUser(data.user);
      handleSignMessage(data.user.nonce);
    }
  }, [data]);

  // Check if user existing or not
  //
  useEffect(() => {
    if (newUserResponse.data?.newUser) {
      setUser(newUserResponse.data.newUser);
      handleSignMessage(newUserResponse.data.newUser.nonce);
    }
  }, [newUserResponse.data]);

  // Call once response is returned from Graphql
  // handles authentication
  useEffect(() => {
    if (loginResponse.data?.login) {
      // set cookie to expire in 1 hr (session)
      var now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);

      document.cookie =
        "token=" + loginResponse.data.login + "; expires=" + now.toUTCString();
      history.push("/");
    }
  }, [loginResponse.data]);

  const handleClick = async () => {
    // setState({walletAddress: "", buttonClicked: true});
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();

    const checkSum = web3.utils.toChecksumAddress(coinbase);

    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    setState({ ...state, walletAddress: checkSum });
    getUser({ variables: { walletAddress: checkSum } });
  };

  async function handleSignMessage(nonce: String) {
    try {
      // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      // body: JSON.stringify({ publicAddress, signature }),

      const signature = await web3!.eth.personal.sign(
        `${nonce}`,
        state.walletAddress,
        "" // MetaMask will ignore the password argument here
      );

      handleLogin({
        variables: { data: { signature, walletAddress: state.walletAddress } },
      });
    } catch (err) {
      alert("You need to sign the message to be able to log in.");
    }
  }

  // handle signout
  const logout = async () => {
    Cookies.remove("token");
    window.location.reload(false);
  };
  return (
    <>
      <div className="page-header-2" data-parallax={true}>
        <Particle />
        {state.isAuthenticated ? (
          <>
            <Container>
              <div className="motto text-center">
                <h2>
                  <strong>You're already signed in </strong>
                </h2>
                <br></br>
                <Card className="text-center">
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <Nav tabs>
                        <NavItem>
                          <NavLink href="javascript:history.back()">
                            BACK
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" active>
                            LOGOUT
                          </NavLink>
                        </NavItem>
                        <NavItem />
                      </Nav>
                    </div>
                  </div>
                  <div>
                    <img
                      src={MaskSVG}
                      className="maskIllustration text-center"
                    />
                  </div>
                  <CardBody>
                    <Button
                      color="primary"
                      size="lg"
                      onClick={function (event) {
                        logout();
                      }}
                    >
                      {state.buttonClicked ? "Loading..." : "Logout"}
                    </Button>
                    <div className="spacer">
                      <CardTitle>
                        Your wallet is used to create NFTs, purchase existing
                        assets, and is used as your account.
                      </CardTitle>
                      <CardText>
                        <small className="text-muted">
                          {" "}
                          We do not have access to your private keys
                        </small>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <div className="motto text-center">
                <h2>
                  <strong>Sign in using your wallet </strong>
                </h2>
                <br></br>
                <Card className="text-center">
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <Nav tabs>
                        <NavItem>
                          <NavLink href="javascript:history.back()">
                            BACK
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" active>
                            LOGIN
                          </NavLink>
                        </NavItem>
                        <NavItem />
                      </Nav>
                    </div>
                  </div>
                  <div>
                    <img
                      src={MaskSVG}
                      className="maskIllustration text-center"
                    />
                  </div>
                  <CardBody>
                    <Button
                      color="primary"
                      size="lg"
                      onClick={function (event) {
                        handleClick();
                      }}
                    >
                      {state.buttonClicked
                        ? "Loading..."
                        : "Login with MetaMask"}
                    </Button>
                    <div className="spacer">
                      <CardTitle>
                        Your wallet is used to create NFTs, purchase existing
                        assets, and is used as your account.
                      </CardTitle>
                      <CardText>
                        <small className="text-muted">
                          {" "}
                          We do not have access to your private keys
                        </small>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Container>
          </>
          // <>
          //   <Container>
          //     <div className="motto text-center">
          //       <h2>
          //         <strong>You're already signed in </strong>
          //       </h2>
          //       <br></br>
          //       <Card className="text-center">
          //         <div className="nav-tabs-navigation">
          //           <div className="nav-tabs-wrapper">
          //             <Nav tabs>
          //               <NavItem>
          //                 <NavLink href="javascript:history.back()">
          //                   BACK
          //                 </NavLink>
          //               </NavItem>
          //               <NavItem>
          //                 <NavLink href="#" active>
          //                   LOGIN
          //                 </NavLink>
          //               </NavItem>
          //               <NavItem />
          //             </Nav>
          //           </div>
          //         </div>
          //         <div>
          //           <img
          //             src={MaskSVG}
          //             className="maskIllustration text-center"
          //           />
          //         </div>
          //         <CardBody>
          //           <Button color="primary" size="lg">
          //             {state.buttonClicked ? "Loading..." : "Logout"}
          //           </Button>
          //           <div className="spacer">
          //             <CardTitle>
          //               Your wallet is used to create NFTs, purchase existing
          //               assets, and is used as your account.
          //             </CardTitle>
          //             <CardText>
          //               <small className="text-muted">
          //                 {" "}
          //                 We do not have access to your private keys
          //               </small>
          //             </CardText>
          //           </div>
          //         </CardBody>
          //       </Card>
          //     </div>
          //   </Container>
          // </>
        )}
        {/* <Container>
          <div className="motto text-center">
            <h2>
              <strong>Sign in using your wallet </strong>
            </h2>
            <br></br>
            <Card className="text-center">
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav tabs>
                    <NavItem>
                      <NavLink href="javascript:history.back()">BACK</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" active>
                        LOGIN
                      </NavLink>
                    </NavItem>
                    <NavItem />
                  </Nav>
                </div>
              </div>
              <div>
                <img src={MaskSVG} className="maskIllustration text-center" />
              </div>
              <CardBody>
                <Button
                  color="primary"
                  size="lg"
                  onClick={function (event) {
                    handleClick();
                  }}
                >
                  {state.buttonClicked ? "Loading..." : "Login with MetaMask"}
                </Button>
                <div className="spacer">
                  <CardTitle>
                    Your wallet is used to create NFTs, purchase existing
                    assets, and is used as your account.
                  </CardTitle>
                  <CardText>
                    <small className="text-muted">
                      {" "}
                      We do not have access to your private keys
                    </small>
                  </CardText>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container> */}
      </div>
    </>
  );
}
export default Login;
