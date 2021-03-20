import React, { Component, useEffect, useState } from "react";
import { Hashicon } from '@emeraldpay/hashicon-react';
import { Link } from "react-router-dom";


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
  UncontrolledTooltip,
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

            <div className="text-left-padding">
              <span id={"tooltip" + product.id}>
                <Hashicon value={product.userHash} size={48}/>
              </span>
              <UncontrolledTooltip target={"tooltip"+ product.id} placement="right">
                Creator Link: {product.id}
              </UncontrolledTooltip>
            </div>

              <Container>
                <CardImg src={product.image} className="marketplace-card-img" />
              </Container>
              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Card subtitle
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Link to={`/content/${product.id}`}>
                <Button>{product.price}</Button>
                </Link>
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
    return true;
  };

  return (
    
    <>
      <Row>{state}</Row>
    </>
  );
};
export default TestProduct;
