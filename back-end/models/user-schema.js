const mongoose = require("mongoose");

userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  likes: [],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
