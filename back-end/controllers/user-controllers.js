const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("../models/user-schema");
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const addUser = async (req, res, next) => {
  const user = req.body;
  console.log(user, "before try");
  try {
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser === null) {
      let token;
      let hashPassword = await bcrypt.hash(user.password, 12);
      user["password"] = hashPassword;
      const newUser = new User(user);

      await newUser.save();

      let returnUser = { id: newUser["_id"], email: newUser["email"] };
      console.log(returnUser);
      token = jwt.sign(
        { id: returnUser.id, email: returnUser.email },
        "my-secret",
        {
          expiresIn: "1d",
        }
      );
      returnUser["token"] = token;
      return res.json({
        status: "ok",
        message: "user added",
        user: returnUser,
      });
    } else {
      //user exist
      return res.json({ status: "fail", message: "user exist" });
    }
  } catch (error) {
    //
    return res.json({ status: "fail", message: "error" });
  }
};

const login = async (req, res, next) => {
  const user = req.body;
  console.log(user);
  const checkUser = await User.findOne({
    email: user.email,
    password: user.password,
  });
  console.log(checkUser);
  if (checkUser === null) {
    return res.json({ status: "fail", message: "User Not Exist" });
  } else {
    return res.json({ status: "ok", message: "User Exist", user: checkUser });
  }
};

module.exports = {
  addUser: addUser,
  login: login,
};
