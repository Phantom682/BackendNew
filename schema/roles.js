const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name:String,
    permissions:Array,
});

module.exports = mongoose.model("role", RoleSchema);