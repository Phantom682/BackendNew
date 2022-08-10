const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const MainCatrgorySchema = new Schema({
    name:String,
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"department",
    },
    subCategoryId:{
        type:[Schema.Types.ObjectId],
        ref:"subCategory"
    }
})

module.exports = mongoose.model('mainCategory',MainCatrgorySchema)