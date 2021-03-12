import React, { Component } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/paper-kit.css";
import Background from "../../assets/img/path1.png";
import BlurredContent from "../../assets/img/blurred-image-1.jpg";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  CardImg,
  CardText,
  CardSubtitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardImgOverlay,
} from "reactstrap";

export default class FeatureCards extends Component {
  constructor(props) {
    super(props);
    console.log(Background);

    this.state = {
      products: [],
      product: {},
      isLoggedIn: false,
    };
  }
  async componentWillMount() {
    await this.setupTestProduct();
    await this.testProduct();
    // TODO : Check login
  }
  render() {
    return (
      <>
        <Container>
          <h1> Marketplace </h1>
          <Row>{this.state.productsHtml}</Row>
        </Container>
      </>
    );
  }
}
