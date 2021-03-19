import React, { Component, useEffect, useState } from "react";
import { Hashicon } from "hashicon-react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Col,
  Container,
  Row,
  CardSubtitle,
} from "reactstrap";

const TestProduct = (props) => {
  const [state, setState] = useState();

  useEffect(() => {
    testProduct();
  }, [props.products]);

  const testProduct = async () => {
    let productsHtml = [];
    await props.products.reduce(async (promise, product) => {
      await promise;
      productsHtml.push(
        <Col xs="6" sm="4">
          <Card key={product.id} className="marketplace-card">
            <>
              <h1>{product.id}</h1>
              <Container>
                <CardImg src={product.image} className="marketplace-card-img" />
              </Container>
              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Card subtitle
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button>{product.price}</Button>
                <CardText>
                  <small className="text-muted">Hey</small>
                  <br></br>
                  <small className="text-muted">
                    <strong>1/1</strong> Available
                  </small>
                </CardText>
              </CardBody>
            </>
          </Card>
        </Col>
      );
    });
    setState(productsHtml);
    const value = "9dddff8f-be81-4c27-80c8-099327865f3f";
    for (let i = 0; i < 15; i++) {
      value = value + i;
    }
    console.log(value);
    return true;
  };

  return (
    <>
      <Row>{state}</Row>
    </>
  );
};
export default TestProduct;
