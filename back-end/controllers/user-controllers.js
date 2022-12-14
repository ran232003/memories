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
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };
  try {
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser === null) {
      let token;
      let hashPassword = await bcrypt.hash(user.password, 12);
      user["password"] = hashPassword;
      const newUser = new User(user);

      await newUser.save();

      let returnUser = { id: newUser["_id"], email: newUser["email"] };
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
function compareAsync(userPassword, dbPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(userPassword, dbPassword, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
const login = async (req, res, next) => {
  let user = {
    email: req.body.email,
    password: req.body.password,
  };
  const checkUser = await User.findOne({
    email: user.email,
  });
  if (checkUser === null) {
    return res.json({ status: "fail", message: "User Not Exist" });
  } else {
    let result = await compareAsync(user.password, checkUser.password);
    if (result) {
      token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        "my-secret",
        {
          expiresIn: "1d",
        }
      );
      let returnUser = {
        id: checkUser["_id"],
        email: checkUser["email"],
        token: token,
      };
      return res.json({
        status: "ok",
        message: "User Exist",
        user: returnUser,
      });
    } else {
      return res.json({ status: "fail", message: "Wrong Password Or Email" });
    }
  }
};
const googleLogin = async (req, res, next) => {
  const user = req.body;
  let response = await client.verifyIdToken({
    idToken: user.tokenId,
    audience:
      "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com",
  });
  const { email_verified, email } = response.payload;
  if (email_verified) {
    const checkUser = await User.findOne({
      email: user.email,
    });
    if (checkUser === null) {
      return res.json({ status: "fail", message: "User Not Exist" });
    } else {
      token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        "my-secret",
        {
          expiresIn: "1d",
        }
      );
      let returnUser = {
        id: checkUser["_id"],
        email: checkUser["email"],
        token: token,
      };
      return res.json({
        status: "ok",
        message: "User Exist",
        user: returnUser,
      });
    }
  } else {
    return res.json({ status: "fail", message: "Email Not Verified" });
  }
};
const googleSignup = async (req, res, next) => {
  const user = req.body;
  try {
    let response = await client.verifyIdToken({
      idToken: user.tokenId,
      audience:
        "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com",
    });
    // console.log(response);
    const { email_verified, email } = response.payload;
    if (email_verified) {
      const checkUser = await User.findOne({ email: user.email });
      if (checkUser === null) {
        let token;
        const newUser = new User({
          email: user.email,
          name: user.name,
          likes: [],
        });

        await newUser.save();

        let returnUser = { id: newUser["_id"], email: newUser["email"] };
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
