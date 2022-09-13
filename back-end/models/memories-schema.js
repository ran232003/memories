const mongoose = require("mongoose");

memorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;
