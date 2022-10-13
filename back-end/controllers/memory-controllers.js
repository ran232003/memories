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
const LikeMemory = async (req, res, next) => {
  console.log("like");
  try {
    let { memoryId, userId } = req.body;
    console.log(memoryId, req.body);
    // const memory = await Memory.findOneAndDelete({ id: memoryId });
    let memory = await Memory.findById(memoryId);
    console.log("mem", memory);
    let checkUser = memory.likes.find((user) => {
      return user === userId;
    });
    //console.log(checkUser, "checkUser");
    if (checkUser) {
      console.log(memory, "memory before");
      // user allready liked the Memory, remove the like
      memory.likes = memory.likes.filter((user) => {
        return user !== userId;
      });
      await memory.save();
      console.log(memory, "memory in if");

      res.json({ status: "ok", memory: memory });
    } else {
      //add user to like array
      memory.likes.push(userId);
      await memory.save();
      console.log(memory, "memory else");
      res.json({ status: "ok", memory: memory });
    }
  } catch (error) {
    console.log(error, "err");
    res.json({ status: "fail" });
  }
};
const editPost = async (req, res, next) => {
  const { desc, title, memoryId } = req.body;
  let image = req.file;
  try {
    if (!image) {
      //no image
      editMemory = await Memory.findById(memoryId);
      editMemory.title = title;
      editMemory.desc = desc;
      await editMemory.save();
      res.json({ status: "ok", memory: editMemory });
    } else {
      let newImage = "http://localhost:5000/" + image.path.replace(/\\/g, "/");
      editMemory = await Memory.findById(memoryId);
      editMemory.title = title;
      editMemory.desc = desc;
      editMemory.image = newImage;
      await editMemory.save();
      res.json({ status: "ok", memory: editMemory });
    }
  } catch (error) {
    res.json({ status: "fail" });
  }
};

module.exports = {
  addPost: addPost,
  deleteMemory,
  getMemories,
  LikeMemory,
  editPost,
};
