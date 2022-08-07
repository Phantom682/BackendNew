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
        "name":"super-admin",
        "permissions":["update-city","delete-city","edit-city","create-city","update-state","delete-state","edit-state","create-state","view-analytics","update-country","delete-country","edit-country","create-country","update-roles-permissions","delete-roles-permissions","edit-roles-permissions","create-roles-permissions","admin-dashboard"]
    },
    {
        "name":"ministry-admin",
        "permissions":["view-grievances","aprrove-grievances","revert-grievances","update","delete","edit","create","suspend-user","view-analytics","admin-dashboard"]
    },
    {
        "name":"department-admin",
        "permissions":["view-grievances","aprrove-grievances","revert-grievances","delete","edit","create","view-analytics","admin-dashboard"]
    },
    {
        "name":"organisation-admin",
        "permissions":["view-grievances","aprrove-grievances","revert-grievances","delete","edit","create","view-analytics","admin-dashboard"]
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