const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("../models/user-schema");
app.use(bodyParser.json());

const addUser = async (req, res, next) => {
  const user = req.body;
  console.log(user);
  try {
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser === null) {
      const newUser = new User(user);
      await newUser.save();
      return res.json({ message: "user added" });
    } else {
      //user exist
      return res.json({ message: "user exist" });
    }
  } catch (error) {
    //
    return res.json({ message: "error" });
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
    return res.json({ message: "User Not Exist" });
  } else {
    return res.json({ message: "User Exist" });
  }
};

module.exports = {
  addUser: addUser,
  login: login,
};
