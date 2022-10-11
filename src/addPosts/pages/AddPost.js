import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../api/apiCalls";
import Headline from "../../components/Headline";
import Input from "../../components/Input";
import MyToast from "../../components/MyToast";
import { memoryAction } from "../../store/memorySlice";
import ImageLoader from "../components/ImageLoader";

const AddPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, bg: "", lable: "" });
  const [inputs, setInputs] = useState({
    title: "",
    titleValid: false,
    desc: "",
    descValid: false,
    image: "",
    imageValid: false,
    likes: 0,
  });
  const handleInput = (input, name, valid) => {
    setInputs(() => {
      return { ...inputs, [name]: input[name], [valid]: input[valid] };
    });
  };
  const submitInput = async () => {
    const data = await addPost(inputs, user);
    if (data.status === "ok") {
      setToast({
        show: true,
        bg: "success",
        lable: "Adding Post Was Successful",
      });
      dispatch(memoryAction.addPost(data.memory));
      setTimeout(() => {
        navigate("/home");
      }, 1600);
    } else {
      setToast({ show: true, bg: "danger", lable: "Fail To Add Post" });
    }
  };
  return (
    <div>
      <div className="head">
        <Headline lable="Add Post" />
      </div>
      <div className="signup">
        <Input
          handleInput={handleInput}
          name="title"
          valid="titleValid"
          lable="Title"
          placeHolder="Enter Title"
          type="text"
          errorMessage="Title is Mandatory Field"
        />
        <Input
          handleInput={handleInput}
          name="desc"
          valid="descValid"
          lable="Description"
          placeHolder="Enter Description"
          type="text"
          inputType="textarea"
          errorMessage="Description is Mandatory Field"
        />
        {/* <input accept="image/*" id="raised-button-file" type="file" /> */}
        <ImageLoader
          handleInput={handleInput}
          name="image"
          valid="imageValid"
        />
        <Button onClick={submitInput}>Submit</Button>
      </div>
      <MyToast toast={toast} />
    </div>
  );
};

export default AddPost;
