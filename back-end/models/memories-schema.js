const mongoose = require("mongoose");

memorySchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  likes: [],
  image: String,
  originalImage: {},
});

const Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;
