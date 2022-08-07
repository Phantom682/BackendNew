const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const DepartmentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    deaprtmentAdmin:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
    grievanceType:{
        type:[Schema.Types.ObjectId],
        ref:'subCategory',
    },
    employees:{
        type:[Schema.Types.ObjectId],
        ref:'user',
    },
})

module.exports = mongoose.model("department",DepartmentSchema)