const mongoose = require("mongoose")
const { Schema } = require('mongoose')
const OrganisationSchema = new mongoose.Schema({
    name:String,
    organisationAdmin:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    departments: {
        type:[Schema.Types.ObjectId],
        ref:'department'
    }
})

module.exports = mongoose.model("organisation",OrganisationSchema)