/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

class LandingPageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.pageHeader = React.createRef();
  }
// useEffect(() => {
//   if (window.innerWidth < 991) {
//     const updateScroll = () => {
//       let windowScrollTop = window.pageYOffset / 3;
//       this.pageHeader.current.style.transform =
//         "translate3d(0," + windowScrollTop + "px,0)";
//     };
//     window.addEventListener("scroll", updateScroll);
//     return function cleanup() {
//       window.removeEventListener("scroll", updateScroll);
//     };
//   }
// });
render() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/login.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={this.pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Example page</h1>
            <h3>Maybe verify 18+ age for legal?</h3>
            <br />

             <Button
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
            onClick={() => {
              console.log("hello click!")
                 this.props.web3.personal.sign(this.props.web3.fromUtf8("Hello from Toptal!"), this.props.web3.eth.coinbase, console.log);

                        // this.props.web3.personal.sign()
                    }}>
              <i className="fa fa-user" />
              LOGIN
            </Button>
           
          </div>
        </Container>
      </div>
    </>
  );
  }
}

export default LandingPageHeader;
