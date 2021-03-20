import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  UncontrolledTooltip,
  Badge,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardHeader,
  CardText,
  Button,
} from "reactstrap";

const SummaryCard = (props) => {
  //

  const [preview, setPreview] = useState();

  useEffect(() => {
    if (props.image != "") {
      // create the preview
      const objectUrl = URL.createObjectURL(props.image);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [props.image]);

  return (
    <Card className="cardSummary" style={{ width: "16rem" }}>
      {/* <CardImg top alt="undefined" />
       */}
      <CardImg top src={preview} className="summary-img" />
      <CardHeader>
        <h3>Summary</h3>
      </CardHeader>
      <CardBody>
        <CardTitle>
          <p>Name:</p>
          <h3 className="h3Summary">
            <strong>{props.name}</strong>
          </h3>
        </CardTitle>
        <p>Description:</p>
        <CardText className="card-text-desc">{props.description}</CardText>
        <ListGroup flush>
          <ListGroupItem id="top">
            <Badge pill>Price </Badge> <strong>{props.price} eth</strong>
          </ListGroupItem>
          <ListGroupItem id="fees">
            <Badge pill>Fees </Badge><strong> 2.5%</strong>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
      <div>
        <UncontrolledTooltip placement="top" target="top" delay={0}>
            Listing price in Ethereum. This is the price others will have to pay to
            purchase your NFT.
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target="fees" delay={0}>
            When someone purchases your NFT, our processing fees are 2.5% of the
            total sale price.
          </UncontrolledTooltip>
    </div>
    </Card>
    
  );
};
export default SummaryCard;
