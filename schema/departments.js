const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const DepartmentSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    deaprtmentAdmin:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
    grievanceCategory:{
        type:Schema.Types.ObjectId,
        ref:"mainCategory"
    },
    employees: Array
})

module.exports = mongoose.model("department",DepartmentSchema)