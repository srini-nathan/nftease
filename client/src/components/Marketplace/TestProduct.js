import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
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
        <Card key={product.id} className="feature-card">
          <>
            <h1>{product.id}</h1>
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
        </Card>
      );
    });

    setState(productsHtml);
    return true;
  };

  return <>{state}</>;
};
export default TestProduct;
