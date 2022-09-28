import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ImageLoader = (props) => {
  const [file, setFile] = useState();
  const handleSubmission = () => {};
  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.files);
    let obj = { valid: true, value: event.target.files[0] };
    console.log(obj);
    props.handleInput(obj, props.fieldName);
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
