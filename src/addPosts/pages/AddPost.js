import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addPost, editPostNewImage, editPostNoImage } from "../../api/apiCalls";
import Headline from "../../components/Headline";
import Input from "../../components/Input";
import MyToast from "../../components/MyToast";
import { memoryAction } from "../../store/memorySlice";
import ImageLoader from "../components/ImageLoader";
import "./AddPost.css";

const AddPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  let { title } = useParams();
  console.log("title", title);
  const [toast, setToast] = useState({ show: false, bg: "", lable: "" });
  const [inputs, setInputs] = useState({
    title: state ? state.title : "",
    titleValid: state ? true : false,
    desc: state ? state.desc : "",
    descValid: state ? true : false,
    image: state ? state.image : "",
    imageValid: state ? true : false,
    likes: 0,
  });
  console.log(inputs, "inputs");
  const handleInput = (input, name, valid) => {
    setInputs(() => {
      return { ...inputs, [name]: input[name], [valid]: input[valid] };
    });
  };
  const submitInput = async () => {
    if (title) {
      let postData = { ...inputs, memoryId: state.id };
      //edit post
      let data;
      if (typeof inputs.image === "string") {
        console.log("no image");

        data = await editPostNoImage(postData);
      } else {
        data = await editPostNewImage(postData);
      }
      if (data.status === "ok") {
        setToast({
          show: true,
          bg: "success",
          lable: "Update Success",
        });
        dispatch(memoryAction.editPost(data.memory));
        setTimeout(() => {
          navigate("/home");
        }, 1600);
      }
    } else {
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
          initValue={inputs.title}
          initValid={inputs.titleValid}
          name="title"
          valid="titleValid"
          lable="Title"
          placeHolder="Enter Title"
          type="text"
          errorMessage="Title is Mandatory Field"
        />
        <Input
          handleInput={handleInput}
          initValue={inputs.desc}
          initValid={inputs.descValid}
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
          initValue={inputs.image}
          initValid={inputs.imageValid}
        />

        <Button onClick={submitInput}>Submit</Button>
      </div>
      <MyToast toast={toast} />
    </div>
  );
};

export default AddPost;
