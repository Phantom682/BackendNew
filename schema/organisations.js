const mongoose = require("mongoose")
const { Schema } = require('mongoose')
const OrganisationSchema = new mongoose.Schema({
    name:String,
    organisationAdmin:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    departments: Array
})

module.exports = mongoose.model("organisation",OrganisationSchema)