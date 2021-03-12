/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Container, Button } from "reactstrap";

export default function PageHeader() {
  return (
    <div className="page-header-3">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <div className="squares square8" />
      <div className="squares square9" />

      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">NFTEASE• </h1>
          <h3 className="d-none d-sm-block">
            <span>✨</span>
            <Link to="/login">
              <Button>CREATE YOUR FREE ACCOUNT TO GET STARTED</Button>
            </Link>
          </h3>
        </div>
      </Container>
    </div>
  );
}
