const mongoose = require('mongoose')
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const connecTOMongo = async () => {
    await dbConnection(process.env.MONGO_URI);
}
connecTOMongo();

const roleModel = require('../schema/roles');

const seedRole = [
    {
        "name":"superAdmin",
        "permissions":["update","delete","edit","create","admin-dashboard"]
    },
    {
        "name":"user",
        "permissions":["view-profile","add-grievances","view-dashboard","delete-grievance","view-status"] 
    }
]

const importData = async () => {
    try {
        await roleModel.deleteMany({})
        await roleModel.insertMany(seedRole)
        console.log("Data imported successfully");
        process.exit()
    }catch(error){
        console.log(error);
        res.status(500).json({ error });
    }
}

importData().then(() => {
    mongoose.connection.close()
})  