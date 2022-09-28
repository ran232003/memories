const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("../models/user-schema");
const { OAuth2Client } = require("google-auth-library");
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(
  "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com"
);
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
const googleLogin = async (req, res, next) => {
  const user = req.body;
  console.log(user);
  let response = await client.verifyIdToken({
    idToken: user.tokenId,
    audience:
      "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com",
  });
  // console.log(response);
  // console.log(response.payload);
  const { email_verified, email } = response.payload;
  if (email_verified) {
    const checkUser = await User.findOne({
      email: user.email,
    });
    if (checkUser === null) {
      return res.json({ status: "fail", message: "User Not Exist" });
    } else {
      return res.json({ status: "ok", message: "User Exist", user: checkUser });
    }
  } else {
    return res.json({ status: "fail", message: "Email Not Verified" });
  }
};
const googleSignup = async (req, res, next) => {
  const user = req.body;
  console.log(user);
  try {
    let response = await client.verifyIdToken({
      idToken: user.tokenId,
      audience:
        "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com",
    });
    // console.log(response);
    console.log(response.payload);
    const { email_verified, email } = response.payload;
    if (email_verified) {
      console.log("if1");
      const checkUser = await User.findOne({ email: user.email });
      console.log(checkUser, "checkUser");
      if (checkUser === null) {
        let token;
        console.log("if2");
        const newUser = new User({
          email: user.email,
          name: user.name,
          likes: [],
        });

        await newUser.save();

        let returnUser = { id: newUser["_id"], email: newUser["email"] };
        console.log(returnUser);
        token = jwt.sign(
          { id: returnUser.id, email: returnUser.email },
          "my-secret",
          {
            expiresIn: "7d",
          }
        );
        returnUser["token"] = token;
        return res.json({
          status: "ok",
          message: "user added",
          user: returnUser,
        });
      } else {
        return res.json({
          status: "fail",
          message: "User Exist, Please Login",
        });
      }
    }
    {
      return res.json({ status: "fail", message: "Email Not Verified" });
    }
  } catch {
    return res.json({ status: "fail", message: "Somthing Wnet Wrong" });
  }
};

module.exports = {
  addUser: addUser,
  login: login,
  googleLogin,
  googleSignup,
};
