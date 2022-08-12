const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const EmployeesSchema = new Schema({
    name:String,
    role:{
        type:Schema.Types.ObjectId,
        ref:"role"
    },
    email:String,
    password:String,
    subCatId:{
        type:[Schema.Types.ObjectId],
        ref:"subCategory"
    }
})