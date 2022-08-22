import React from "react";
import Input from "../../components/Input";
import "./Authintication.css";
const Authintication = () => {
  return (
    <div className="signup">
      <Input
        lable="Name"
        placeHolder="Enter Name"
        type="text"
        errorMessage="Name is Mandatory Field"
      />
      <Input lable="Email" placeHolder="Enter Email" type="email" />
      <Input
        lable="Password"
        placeHolder="Enter password"
        type="password"
        errorMessage="Name is Mandatory Field"
      />
    </div>
  );
};

export default Authintication;
