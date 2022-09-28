import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Headline from "../../components/Headline";
import Input from "../../components/Input";
import ImageLoader from "../components/ImageLoader";

const AddPost = () => {
  const [inputs, setInputs] = useState({
    title: "",
    titleValid: false,
    desc: "",
    descValid: false,
    image: "",
    imageValid: false,
    likes: 0,
  });
  const handleInput = () => {};
  const submitInput = () => {};
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
        <ImageLoader />
        <Button onClick={submitInput}>Submit</Button>
      </div>
    </div>
  );
};

export default AddPost;
