import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import MaskSVG from "../../assets/img/metamask.svg";
import EthIcon from "../../assets/img/ethIcon.png";
import FileUpload from "./FileUploadPage";
import FormErrors from "./FormErrors";

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

export default class CreateNFT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentName: "",
      contentDesc: "",
      formErrors: { nameError: "", descError: "" },
      nameValid: false,
      descValid: false,
      formValid: false,
      chars_left: 0,
      chars_left_desc: 0,
      ethUsd: {},
      hasEthVal: false,
      estVal: 0,
    };
  }
  componentDidMount() {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ethUsd: data.USD, hasEthVal: true });
        console.log(this.state.ethUsd);
      })
      .catch(console.log);
  }

  // API - Call once on page load
  //  // https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  handleEstimateValue(e) {
    let calc = e.target.value * this.state.ethUsd;
    this.setState({ estVal: calc });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let descValid = this.state.descValid;

    switch (fieldName) {
      case "contentName":
        nameValid = value.length >= 3;
        this.setState({
          chars_left: value.length,
        });

        fieldValidationErrors.contentName = nameValid
          ? ""
          : "Name must be atleast 3 characters";
        break;
      case "contentDesc":
        descValid = value.length <= 140;
        this.setState({
          chars_left_desc: value.length,
        });
        fieldValidationErrors.contentDesc = descValid
          ? ""
          : "Description is too long";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        descValid: descValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.descValid,
    });
  }

  render() {
    return (
      <>
        <main class="profile-page">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 
            Start Container Section
          */}
          <Container>
            <Row>
              <Col lg={10}>
                <section className="section">
                  <Card className="card-profile shadow mt--300">
                    <div className="px-4">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={MaskSVG}
                              />
                            </a>
                          </div>
                        </Col>
                        <Col
                          className="order-lg-3 text-lg-right align-self-lg-center"
                          lg="4"
                        >
                          <div className="card-profile-actions py-4 mt-lg-0"></div>
                        </Col>
                        <Col className="order-lg-1" lg="4">
                          <div className="card-profile-stats d-flex justify-content-center"></div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="text-center mt-5">
                            <h1>Create your NFT</h1>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">
                          <div className="text-center mt-5">
                            <h5 className="text-on-back">01</h5>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="text-center mt-5">
                            <FileUpload
                              accept={"image/jpeg, image/png, image/gif"}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>
                          <div className="text-center mt-5">
                            <h5 className="text-on-back">02</h5>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="text-center mt-5">
                            <h4 className="text-left">Name of your content</h4>
                            <p className="text-left">
                              {this.state.chars_left}/16
                            </p>

                            <Input
                              className="inputName"
                              type="text"
                              name="contentName"
                              required
                              placeholder="Eg. My NFTease Photo"
                              value={this.state.contentName}
                              maxLength={16}
                              onChange={(event) => this.handleUserInput(event)}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">
                          <div className="text-center mt-5">
                            <h5 className="text-on-back">03</h5>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="text-center mt-5">
                            <h4 className="text-left">
                              Description of what people are purchasing.
                            </h4>
                            <p className="text-left">
                              {this.state.chars_left_desc}/140
                            </p>

                            <Input
                              type="textarea"
                              className="inputName"
                              name="contentDesc"
                              value={this.state.contentDesc}
                              placeholder="Provide a meaningful description of your content"
                              onChange={(event) => this.handleUserInput(event)}
                            />
                          </div>
                        </Col>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                          <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">
                          <div className="text-center mt-5">
                            <h5 className="text-on-back">04</h5>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="text-center mt-5">
                            <h4 className="text-left">Price</h4>
                            <p className="text-left">
                              Enter the price to sell this item in Ethereum.
                            </p>
                            <InputGroup>
                              <InputGroupText>
                                <img src={EthIcon} className="ethIcon"></img>
                              </InputGroupText>
                              <Input
                                placeholder="Amount"
                                min={0}
                                type="number"
                                step="0.005"
                                onChange={(event) =>
                                  this.handleEstimateValue(event)
                                }
                              />
                            </InputGroup>
                            {this.state.hasEthVal ? (
                              <p className="text-left">
                                <strong>
                                  Estimated USD value:{" "}
                                  {this.state.estVal.toFixed(2).toString()}
                                </strong>
                              </p>
                            ) : (
                              <p> Loading.. </p>
                            )}
                            <br></br>
                            <p className="text-left">
                              To learn more about how youre paid check here 👉🏿
                            </p>
                          </div>
                        </Col>
                      </Row>

                      {/* <Button>Create new NFT</Button> */}
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">
                          <Col lg="9">
                            <p>
                              By publishing your content on NFTease you agree to
                              our TOS. Any images and minted tokens are subject
                              to removal following our safety-standards and
                              terms of service.
                            </p>
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              View Terms of Service
                            </a>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </section>
              </Col>
              <Col>
                <Card className="test">
                  <h4>Summary</h4>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}
