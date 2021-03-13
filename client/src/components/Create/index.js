import React, { useCallback, Component } from "react";
import Token from "../../assets/img/etherum.png";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
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
  render() {
    return (
      <>
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section-special">
          <Container>
            <Row>
              <Col sm={{ size: 4, order: 2, offset: 1 }}>
                <Link to="create/newErc721">
                  <Card className="card-selectToken">
                    <CardHeader>
                      <CardImg top src={Token} className="tokenImg" />
                      <Row>
                        <CardTitle className="text-center col-md-12">
                          <h4>Create new NFT</h4>
                        </CardTitle>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        Create your own special content to exist as an NFT
                        forever. Photos are completely private and{" "}
                        <strong>ONLY</strong> accessible to the NFT holder. You
                        choose the price!
                      </CardText>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
              <Col sm={{ size: 4, order: 2, offset: 1 }}>
                <Card className="card-selectToken" id="top">
                  <CardHeader>
                    <CardImg top src={Token} className="tokenImg" />
                    <Row>
                      <CardTitle className="text-center col-md-12">
                        <h4>Create Collection</h4>
                        <h4>COMING SOON</h4>
                      </CardTitle>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <CardText></CardText>
                  </CardBody>
                </Card>
                <UncontrolledTooltip placement="right" target="top" delay={0}>
                  Follow our social media @NFTeaseApp to keep up to date with
                  our development status.
                </UncontrolledTooltip>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Link to="/how-it-works">
                <h3>🤔 Learn More about NFTs and how this content works</h3>
              </Link>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
