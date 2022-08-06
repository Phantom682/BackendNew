const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const DistrictSchema = new mongoose.Schema({
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("district", DistrictSchema);