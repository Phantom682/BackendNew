const mongoose = require("mongoose");
const { Schema } = require("mongoose")
const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  firstName: String,
  lastName: String,
  mobile: String,
  dob: Date,
  salt: String,
  gender: String,
  role:{
    type: Schema.Types.ObjectId,
    ref:'role'
  },
});

module.exports = mongoose.model("user", UserSchema);
