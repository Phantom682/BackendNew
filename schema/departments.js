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
    mainCategoryIds:{
        type:[Schema.Types.ObjectId],
        ref:'mainCategory',
    },
    employees:{
        type:[Schema.Types.ObjectId],
        ref:'user',
    },
})

module.exports = mongoose.model("department",DepartmentSchema)