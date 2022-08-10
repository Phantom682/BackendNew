const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const SubCategorySchema = new Schema({
    name:String,
    grievanceId:{
        type:[Schema.Types.ObjectId],
        ref:'grievance'
    }
});

module.exports = mongoose.model('subCategory',SubCategorySchema);