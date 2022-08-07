const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const MainCatrgorySchema = new Schema({
    name:String
})

module.exports = mongoose.model('mainCategory',MainCatrgorySchema)