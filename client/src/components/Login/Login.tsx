import React, { useState, useEffect } from "react";
import Background from "../../assets/img/login-image.jpg";
import Particle from "../../assets/animation/particles";
import "../../assets/css/paper-kit.css";
import {
  useUserLazyQuery,
  useLoginMutation,
  useNewUserMutation,
} from "../../generated/graphql";

import { useQuery, gql, useMutation } from "@apollo/client";

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
  });

  const [userState, setUser] = useState<UserClass | null>(null);

  const [createUser, newUserResponse] = useNewUserMutation();

  const [getUser, { data, loading, error }] = useUserLazyQuery();

  const [handleLogin, loginResponse] = useLoginMutation();

  useEffect(() => {
    if (data && data.user == null && state.walletAddress) {
      console.log("create");
      createUser({
        variables: {
          data: {
            walletAddress: state.walletAddress,
            username: Math.random().toString(),
          },
        },
      });
      // authenticate
    }
  }, [data, state]);

  useEffect(() => {
    console.log("data exists already", data);
    if (data?.user) {
      setUser(data.user);
      handleSignMessage(data.user.nonce);
    }
  }, [data]);

  useEffect(() => {
    console.log("dev stink", newUserResponse);
    if (newUserResponse.data?.newUser) {
      setUser(newUserResponse.data.newUser);
      handleSignMessage(newUserResponse.data.newUser.nonce);
    }
  }, [newUserResponse.data]);

  useEffect(() => {
    if (loginResponse.data?.login) {
      console.log("great success", loginResponse);
      //   setUser(newUserResponse.data.newUser);
      //   handleSignMessage(newUserResponse.data.newUser.nonce);
    }
  }, [loginResponse.data]);

  const handleClick = async () => {
    console.log("HANDLE");
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
    console.log("HELO", nonce);
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
      // return { state.walletAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  }
  function handleAuthenticate(address: string, signature: string) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ address, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
  }

  return (
    <>
      <div className="page-header-2" data-parallax={true}>
        <Particle />

        <Container>
          <div className="motto text-center">
            <h2> Sign in using your wallet </h2>
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
        </Container>
      </div>
    </>
  );
}
export default Login;
