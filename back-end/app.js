const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://ranfa:232003@cluster0.d2yn9.mongodb.net/Yad2?retryWrites=true&w=majority"
);

const cors = require("cors");
app.use(cors());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//app.use("/api/user", userRouter);
