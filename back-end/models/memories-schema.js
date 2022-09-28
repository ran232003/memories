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
  user: {
    type: String,
    trim: true,
    required: true,
  },
  likes: Number,
  image: String,
});

const Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;
