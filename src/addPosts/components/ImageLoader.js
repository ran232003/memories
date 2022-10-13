import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ImageLoader = (props) => {
  const { name, valid, initValue, initValid } = props;
  const [file, setFile] = useState({ [valid]: initValid, [name]: initValue });
  const handleSubmission = () => {};
  const changeHandler = (event) => {
    let obj = { [valid]: true, [name]: event.target.files[0] };
    setFile({ [valid]: true, [name]: event.target.files[0] });
    props.handleInput(obj, name, valid);
  };
  return (
    <div className="imageLoad">
      <Form.Label>Choose File</Form.Label>
      <br />
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        name="file"
        onChange={changeHandler}
      />
      {file[valid] && typeof file[name] !== "string" ? (
        <img
          className="imagePrev"
          src={URL.createObjectURL(file[name])}
          alt="Thumb"
        />
      ) : (
        <img className="imagePrev" src={file[name]} alt=" Choose Image" />
      )}
    </div>
  );
};

export default ImageLoader;
