import React, { useState, useEffect } from 'react'
import Background from '../../assets/img/login-image.jpg';
import Particle from '../../assets/animation/particles'
import "../../assets/css/paper-kit.css";
import { useUserLazyQuery } from '../../generated/graphql'
import { useNewUserMutation } from '../../generated/graphql'
// import { useLazyQuery } from "@apollo/client";
import { useQuery, gql, useMutation } from '@apollo/client';

import Web3 from "web3";
import { Card, CardHeader, CardBody, CardTitle, CardText, Nav, NavItem, NavLink, Button, Container } from 'reactstrap';


// import { Auth } from '../types';
let web3: Web3 | undefined = undefined; // Will hold the web3 instance


export function Login() {
	const [state, setState] = useState({buttonClicked: false, walletAddress: "", waitLoad: "Please wait.."})
	const [user, setUser] = useState(null)

  	const [createUser, newUserResponse] = useNewUserMutation();

  	console.log(newUserResponse)

  	const [ getUser, {data, loading, error} ] = useUserLazyQuery()

	useEffect(() => {
		if(data && data.user == null && state.walletAddress){
			console.log("create")
			createUser({ variables: { data: {walletAddress: state.walletAddress, username: Math.random().toString() }}})
		}
	}, [ data, state])

	useEffect(() => {
		if(data?.user){

			console.log("Login")
			handleSignMessage();
			// createUser({ variables: { data: {walletAddress: state.walletAddress, username: Math.random().toString() }}})
		}
	}, [ data ])	

	if(data?.user?.walletAddress){
		console.log("Have user")
		console.log(data)
	} else {
		console.log("No user")
	}

  	if(error){
  		console.log(error)
  	}

    const handleClick = async () => {

	    console.log("Handle click")
	    // setState({walletAddress: "", buttonClicked: true});
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
    	setState({...state, walletAddress: checkSum});
		getUser({ variables: {walletAddress: checkSum} });

    	// console.log(data?.user?.username)
  	// console.log(state.walletAddress)
   	// getUser({ variables: {walletAddress: state.walletAddress} });
    // const [data, loading]
 //    fetch(
 //      'http://localhost:8080/graphql' + checkSum
 //    ).then(function(response) {
 //    		console.log(response)
	// 	    if (response.status == 404) {
	// 	        handleSignup(checkSum)
 //            setState({walletAddress: checkSum, loading: false});
	// 	    } 
	// 	    return response.json();
	// 	})
 //  	.then(body => {
 //  		handleSignMessage(checkSum, body.data.nonce)
 //  		return body.data.nonce;
 //  	})
 //    	// .then(handleSignMessage)
	// .catch(e => {
 //        if(e == "TypeError: Failed to fetch"){
 //          window.alert("Sorry but we're having troubles connecting to our services right now. Please try again later. Check our social media for updates on this issue @NFTeaseApp.")
 //          setState({...state, loading: false});
 //        	}
	// 	})

      // setState({walletAddress: checkSum, loading: true});
  }



   async function handleSignMessage(){
		try {
          // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      // body: JSON.stringify({ publicAddress, signature }),

			const signature = await web3!.eth.personal.sign(
				`NFTease uses cryptography to verify that you are the owner of this account.\lBy clicking sign, you are verifying your ownership of this account. It will not cost you any Eth, so dont worry!\n My special one-use code is:`,
				state.walletAddress,
				'' // MetaMask will ignore the password argument here
			);

			// return { state.walletAddress, signature };
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
    <h1>{state.waitLoad}</h1>
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
            <Button color="primary" size="lg" onClick={function(event){ handleClick()}}>
            {state.buttonClicked ? 'Loading...' : 'Login with MetaMask'}
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