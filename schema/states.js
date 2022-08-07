const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const StateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
});

module.exports = mongoose.model("state", StateSchema);