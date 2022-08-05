const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  firstName: String,
  lastName: String,
  mobile: String,
  dob: Date,
  salt: String,
});

module.exports = mongoose.model("user", UserSchema);
