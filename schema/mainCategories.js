const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const MainCatrgorySchema = new Schema({
    name:String,
    mainCatAdmin:{
        type:Schema.Types.ObjectId,
        ref:"department",
    },
    employeeIds:{
        type:[Schema.Types.ObjectId],
        ref:"user"
    },
    subCategoryId:{
        type:[Schema.Types.ObjectId],
        ref:"subCategory"
    },
})

module.exports = mongoose.model('mainCategory',MainCatrgorySchema)