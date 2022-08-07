const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GrievanceSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  mainCat: {
    type: String,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  department: {
    type:Schema.Types.ObjectId,
    ref:"department"
  },
  files:{
    type:String
  },
  supportedDoc:{
    type:String
  },
  subCat: {
    type: Schema.Types.ObjectId,
    ref:"subCategory"
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  verifiedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("grievance", GrievanceSchema);
