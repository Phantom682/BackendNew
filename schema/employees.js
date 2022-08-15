const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const EmployeesSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    assignedCatId:{
        type:[Schema.Types.ObjectId],
        ref:"subCategory"
    }
})

module.exports = mongoose.model('employee',EmployeesSchema)