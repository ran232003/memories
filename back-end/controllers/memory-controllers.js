const express = require("express");
const bodyParser = require("body-parser");
const Memory = require("../models/memories-schema");
const app = express();
app.use(bodyParser.json());

const addPost = async (req, res, next) => {
  try {
    console.log(req.body, req.file, "test");
    let image = req.file;
    let newImage = "http://localhost:5000/" + image.path.replace(/\\/g, "/");
    let newMemory = new Memory({
      title: req.body.title,
      desc: req.body.desc,
      image: newImage,
      userId: req.body.userId,
    });

    await newMemory.save();

    res.json({ status: "ok", memory: newMemory });
  } catch (error) {
    console.log(error);
    res.json({ status: "fail", error: error });
  }
};
const getMemories = async (req, res, next) => {
  try {
    const memories = await Memory.find();
    res.json({ status: "ok", memories: memories });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
const deleteMemory = async (req, res, next) => {
  console.log("delete");
  try {
    let { memoryId } = req.body;
    console.log(memoryId, req.body);
    // const memory = await Memory.findOneAndDelete({ id: memoryId });
    const memory = await Memory.findByIdAndDelete(memoryId);
    res.json({ status: "ok", memory: "memory" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};

module.exports = {
  addPost: addPost,
  deleteMemory,
  getMemories,
};
