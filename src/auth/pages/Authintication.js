import React, { useState } from "react";
import Headline from "../../components/Headline";
import Input from "../../components/Input";
import "./Authintication.css";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { signup } from "../../api/apiCalls";
const Authintication = () => {
  const [inputs, setInputs] = useState({
    name: "",
    nameValid: false,
    password: "",
    passwordValid: false,
    email: "",
    emailValid: false,
  });
  let { status } = useParams();
  const handleInput = (input, name, valid) => {
    setInputs(() => {
      return { ...inputs, [name]: input[name], [valid]: input[valid] };
    });
  };
  const submitInput = () => {
    let user = {
      name: inputs.name,
      password: inputs.password,
      email: inputs.email,
    };
    let response = signup(user);
  };
  return (
    <div>
      <div className="head">
        <Headline lable={status.toUpperCase()} />
      </div>
      <div className="signup">
        {status === "login" ? null : (
          <Input
            handleInput={handleInput}
            name="name"
            valid="nameValid"
            lable="Name"
            placeHolder="Enter Name"
            type="text"
            errorMessage="Name is Mandatory Field"
          />
        )}

        <Input
          handleInput={handleInput}
          name="email"
          valid="emailValid"
          lable="Email"
          placeHolder="Enter Email"
          type="email"
          errorMessage="email is Mandatory Field"
        />
        <Input
          handleInput={handleInput}
          name="password"
          valid="passwordValid"
          lable="Password"
          placeHolder="Enter password"
          type="password"
          errorMessage="password is Mandatory Field"
        />
        <Button onClick={submitInput}>Submit</Button>
      </div>
    </div>
  );
};

export default Authintication;
