import React, { useState } from 'react'
import Background from '../../assets/img/login-image.jpg';
import Particle from '../../assets/animation/particles'
import "../../assets/css/paper-kit.css";

import Web3 from "web3";
import { Card, CardHeader, CardBody, CardTitle, CardText, Nav, NavItem, NavLink, Button, Container } from 'reactstrap';


// import { Auth } from '../types';
let web3: Web3 | undefined = undefined; // Will hold the web3 instance

function Login() {

	const [state, setState] = useState({loading: false, walletAddress: ""})

    async function handleClick() {
    setState({walletAddress: "", loading: true});
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

		web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();

    const checkSum  = web3.utils.toChecksumAddress(coinbase)

    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }
	// console.log(coinbase.toLowerCase())
    // setState({publicAddress: coinbase.toLowerCase(), loading: true});
	// setState({...state, publicAddress: coinbase.toLowerCase()});

    // setState({ loading: true });
    // console.log(coinbase.toLocaleUpperCase())
    // Look if user with current publicAddress is already present on backend
    fetch(
      'http://localhost:8000/api/users/address/' + checkSum
    ).then(function(response) {
    		console.log(response)
		    if (response.status == 404) {
		        handleSignup(checkSum)
            setState({walletAddress: checkSum, loading: false});
		    } 
		    return response.json();
		})
  	.then(body => {
  		handleSignMessage(checkSum, body.data.nonce)
  		return body.data.nonce;
  	})
    	// .then(handleSignMessage)



		 .catch(e => {
        if(e == "TypeError: Failed to fetch"){
          window.alert("Sorry but we're having troubles connecting to our services right now. Please try again later. Check our social media for updates on this issue @NFTeaseApp.")
          setState({...state, loading: false});
        }
		 })

      // setState({walletAddress: checkSum, loading: true});
  };

  async function handleSignup(address: string) {
  	console.log(state.walletAddress)
    fetch('http://localhost:8000/api/users/', {
      body: JSON.stringify({ "username": "fuckqu", "walletAddress": address, "bio": "I <3 big dix" }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
  }).then(response => response.json());
  }

   async function handleSignMessage(address: string, nonce: string){
		try {
          // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      // body: JSON.stringify({ publicAddress, signature }),

			const signature = await web3!.eth.personal.sign(
				`NFTease uses cryptography to verify that you are the owner of this account.\lBy clicking sign, you are verifying your ownership of this account. It will not cost you any Eth, so dont worry!\n My special one-use code is: ${nonce}`,
				address,
				'' // MetaMask will ignore the password argument here
			);

			return { address, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};
  function handleAuthenticate(address: string, signature: string) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ address, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
	}

// <div className="content-center">
//         <Container>
//         <h1>Login</h1>
//         <h2 className="presentation-subtitle text-center">
//               New? need help? how about an account? anyhting? hello?
//         </h2>
//            <div className="content-center">
//           <Button color="primary" size="lg" onClick={() => handleClick()}>
//             {state.loading ? 'Loading...' : 'Login with MetaMask'}
//           </Button>
//                 </div>

//         </Container>
//       </div>

	return (
    <>
    <div
        className="page-header-2"
        data-parallax={true}
      >
    <Particle/>

    <Container>
    <div className="motto text-center">
    <h2> Sign in using your wallet </h2>
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
              <NavLink href="#" active>LOGIN</NavLink>
            </NavItem>
            <NavItem />
          </Nav>
        </div>
      </div>
        <CardBody>
            <Button color="primary" size="lg" onClick={() => handleClick()}>
            {state.loading ? 'Loading...' : 'Login with MetaMask'}
          </Button>
          <div className="spacer">
            <CardTitle>Your wallet is used to create NFTs, purchase existing assets, and is used as your account.</CardTitle>
            <CardText><small className="text-muted"> We do not have access to your private keys</small></CardText>
            </div>
        </CardBody>
    </Card>

    </div>
    </Container>
    </div>
 	</>
	)
}
export default Login;