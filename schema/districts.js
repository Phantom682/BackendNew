const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const DistrictSchema = new mongoose.Schema({
  state: {
    type:String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("district", DistrictSchema);