import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ImageLoader = (props) => {
  const { name, valid } = props;
  const [file, setFile] = useState();
  const handleSubmission = () => {};
  const changeHandler = (event) => {
    let obj = { [valid]: true, [name]: event.target.files[0] };
    props.handleInput(obj, name, valid);
  };

  return (
    <div className="file">
      <Form.Label>Choose File</Form.Label>
      <br />
      <input type="file" name="file" onChange={changeHandler} />
    </div>
  );
};

export default ImageLoader;
