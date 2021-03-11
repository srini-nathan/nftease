import React, { Component } from "react";
import ReactDOM from "react-dom";
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
  async setupTestProduct() {
    let products = [];
    let product = this.state.product;
    for (let i = 0; i < 15; i++) {
      product = {
        id: i,
        title: "Testing Product",
        date: "MAR-11-2020",
        description: "Testing a very ebic description",
        image:
          "https://i.pinimg.com/originals/f3/bd/84/f3bd8497e15399201b634714ec5ed390.jpg",
        owner: "me",
        price: "$22",
      };
      products.push(product);
    }
    this.setState({ products });
    console.log(products);
  }

  async testProduct() {
    console.log(this.products);
    let productsHtml = [];
    if (this.state.products.length == 0) {
      console.log("THE TOTAL LENGTH IS 0");
    } else {
      await this.state.products.reduce(async (promise, product) => {
        await promise;
        productsHtml.push(
          <Card key={product.id} className="feature-card">
            {this.state.isLoggedIn ? (
              <>
                <CardImg top src={product.image} />
                <CardBody>
                  <CardTitle>{product.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">
                    Card subtitle
                  </CardSubtitle>
                  <CardText>{product.description}</CardText>
                  <Button>{product.price}</Button>
                  <CardText>
                    <small className="text-muted">On market for 3 mins</small>
                    <br></br>
                    <small className="text-muted">
                      <strong>1/1</strong> Available
                    </small>
                  </CardText>
                </CardBody>
              </>
            ) : (
              // VV IF NOT LOGGED IN VV
              <>
                <CardImg
                  top
                  src={BlurredContent}
                  className="card-custom-image"
                />
                <CardImgOverlay className="card-custom-image">
                  <CardBody>
                    <span>
                      <h2>🔒</h2>
                      <CardText>You must login to view this content</CardText>
                    </span>
                    <Button>LOGIN</Button>
                    {/* <CardText>
                      <small className="text-muted">On market for 3 mins</small>
                      <br></br>
                      <small className="text-muted">
                        <strong>1/1</strong> Available
                      </small>
                    </CardText> */}
                  </CardBody>
                </CardImgOverlay>
              </>
            )}
          </Card>
        );
      });
    }
    this.setState({ productsHtml });
    return true;
  }

  render() {
    return (
      <>
        <Container>
          <h1> 🔥 What's hot</h1>
          <Row>{this.state.productsHtml}</Row>
        </Container>
      </>
    );
  }
}
// export default Home;
