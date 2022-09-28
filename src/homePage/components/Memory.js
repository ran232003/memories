import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Memory.css";
import { AiFillLike, AiFillDelete } from "react-icons/ai";
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
          <div className="footer">
            <div className="footer left">
              <AiFillLike className="pointer" size={30} />
              <p>LIKE </p>
            </div>
            <div className="footer right">
              <AiFillDelete className="pointer" size={30} /> <p>DELETE </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Memory;
