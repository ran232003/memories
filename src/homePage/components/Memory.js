import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import "./Memory.css";
import {
  AiOutlineLike,
  AiFillDelete,
  AiFillDislike,
  AiFillEdit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { memoryAction } from "../../store/memorySlice";
import { deleteMemory, LikeMemory } from "../../api/apiCalls";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Memory = (props) => {
  const navigate = useNavigate();
  const { title, image, desc, id, likes, userId, likesArray } = props;
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const dispatch = useDispatch();
  const like = async () => {
    console.log("like", id, user.id);
    let payload = { memoryId: id, userId: user.id };

    const data = await LikeMemory(payload);
    console.log("data.status", data.status);
    if (data.status === "ok") {
      console.log("before", data.memory);
      dispatch(memoryAction.like(data.memory));
    }
  };
  const handleDelete = async () => {
    let payload = { memoryId: id, userId: user._id };
    // dispatch(memoryAction.deletePost(payload));

    const data = await deleteMemory(payload);
    if (data.status === "ok") {
      console.log("before", data.memory);
      dispatch(memoryAction.deletePost(payload));
    }
  };
  let style;
  const checkLike = () => {
    likesArray.forEach((element) => {
      if (element === user.id) {
        style = { color: "blue" };
      }
    });
  };
  checkLike();
  const editMemory = () => {
    navigate(`/edit/:${title}`, {
      state: { title, image, desc, id },
    });
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
          <div className="left">
            <AiOutlineLike
              className="pointer likeIcon"
              size={30}
              style={style}
              onClick={like}
            />
            <p>LIKE {likes} </p>
          </div>
          {userId === user.id ? (
            <div className="centerIcon">
              <AiFillEdit size={30} className="pointer" onClick={editMemory} />{" "}
              <p className="delete">EDIT </p>{" "}
            </div>
          ) : null}
          {userId === user.id ? (
            <div className="right">
              <AiFillDelete
                className="pointer"
                size={30}
                onClick={handleDelete}
              />{" "}
              <p className="delete">DELETE </p>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default Memory;
