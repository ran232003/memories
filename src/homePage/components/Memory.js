import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Memory.css";
const Memory = (props) => {
  const { title, image, desc } = props;
  return (
    <div className="memory">
      {" "}
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{desc}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Memory;
