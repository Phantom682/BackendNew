const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GrievanceSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  mainCat: {
    type: Schema.Types.ObjectId,
    ref:"mainCategory"
  },
  subCat:{

  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  fileName:{
    type:String
  },
  filePath:{
    type:String
  },
  supportedDocName:{
    type:String
  },
  supportedDocPath:{
    type:String
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
