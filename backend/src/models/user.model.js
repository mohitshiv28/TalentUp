const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Account already exists with this email"],
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
