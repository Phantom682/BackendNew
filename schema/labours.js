const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const LabourSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'user',
    },
    address:{
        type:String,
    },
    country:{
        type:String,
    },
    state:{
        type:String,
    },
    district:{
        type:String,
    },
})

module.exports = mongoose.model("labour",LabourSchema)