const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const SubCategorySchema = new Schema({
    name:String,
    mainCategoryId:{
        typr:Schema.Types.ObjectId,
        ref:'mainCategory'
    }
});

module.exports = mongoose.model('subCategory',SubCategorySchema);