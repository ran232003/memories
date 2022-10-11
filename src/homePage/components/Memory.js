import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Memory.css";
import { AiFillLike, AiFillDelete, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { memoryAction } from "../../store/memorySlice";
import { deleteMemory } from "../../api/apiCalls";
const Memory = (props) => {
  const { title, image, desc, id, likes } = props;
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const dispatch = useDispatch();
  const like = () => {
    console.log("like", id, user._id);
    let payload = { memoryId: id, userId: user._id };
    console.log(payload);

    dispatch(memoryAction.like(payload));
  };
  const handleDelete = async () => {
    let payload = { memoryId: id, userId: user._id };
    dispatch(memoryAction.deletePost(payload));
    console.log("delete");

    const data = await deleteMemory(payload);
  };
  return (
    <div className="memory">
      {" "}
      <Card className="cardCont" style={{ width: "30rem" }}>
        <Card.Img className="cardImage" variant="top" src={image} />
        <Card.Body className="cardBody">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{desc.substring(0, 200)}... </Card.Text>
        </Card.Body>
        <div className="footer">
          <div className="footer left">
            <AiFillLike className="pointer" size={30} onClick={like} />
            <p>LIKE {likes} </p>
          </div>
          <div className="footer right">
            <AiFillDelete
              className="pointer"
              size={30}
              onClick={handleDelete}
            />{" "}
            <p className="delete">DELETE </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Memory;
