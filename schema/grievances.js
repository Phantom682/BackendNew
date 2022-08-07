const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GrievanceSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  department: {
    type: Date,
  },
  type: {
    type: Schema.Types.ObjectId,
  },
  assignedTo: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  status: {
    type: String,
  },
  verifiedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("grievance", GrievanceSchema);
