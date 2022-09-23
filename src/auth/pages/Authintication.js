import React, { useEffect, useState } from "react";
import Headline from "../../components/Headline";
import Input from "../../components/Input";
import "./Authintication.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { signup } from "../../api/apiCalls";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import GoogleSign from "./GoogleSign";
import MyToast from "../../components/MyToast";

//client id: 168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com
//secret: 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
const Authintication = () => {
  let test =
    "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com";
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    nameValid: false,
    password: "",
    passwordValid: false,
    email: "",
    emailValid: false,
  });
  const [alertObject, setAlert] = useState({
    lable: "",
    showAlert: false,
    cssClass: "",
  });

  let { status } = useParams();
  const handleInput = (input, name, valid) => {
    setInputs(() => {
      return { ...inputs, [name]: input[name], [valid]: input[valid] };
    });
  };
  const navigateTo = () => {
    if (status === "login") {
      navigate("/auth/signup");
    } else if (status === "signup") {
      navigate("/auth/login");
    }
  };
  const submitInput = async () => {
    let user = {
      name: inputs.name,
      password: inputs.password,
      email: inputs.email,
    };
    let data = await signup(user);
    console.log(data);

    if (data.status === "ok") {
      setAlert(() => {
        return { lable: data.message, cssClass: "success", showAlert: true };
      });
    } else {
      setAlert(() => {
        return { lable: data.message, cssClass: "danger", showAlert: true };
      });
    }
  };
  const handleNavigate = () => {
    navigate("/home");
  };
  const signWithGoogle = (input) => {};
  let authStatus =
    status === "login" ? (
      <p className="myText">
        DON'T HAVE AN ACCOUNT?
        <a onClick={navigateTo} className="myLink">
          SIGNUP
        </a>
      </p>
    ) : (
      <p className="myText">
        ALREADY HAVE AN ACCOUNT?
        <a onClick={navigateTo} className="myLink">
          LOGIN
        </a>
      </p>
    );

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
        <div className="flexButtons">
          <Button onClick={submitInput}>Submit</Button>
          <GoogleSign signWithGoogle={signWithGoogle} />
        </div>

        <div className="checkLable">
          <Form.Label>{authStatus}</Form.Label>
        </div>

        <div>
          <MyToast
            handleNavigate={handleNavigate}
            showObject={alertObject}
            className="centerAlert"
          />
        </div>
      </div>
    </div>
  );
};

export default Authintication;
