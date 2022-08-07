const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const connecTOMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connecTOMongo();

const userModel = require("../schema/users");

const seedUsers = [
  {
    "email": "superadmin@gmail.com",
    "password": "superadmin",
    "role":"62ef6bb5b3c24a9c22803c71",
  },
  {
    "email": "ministryadmin@gmail.com",
    "password": "ministryadmin",
    "role":"62ef6bb5b3c24a9c22803c72",
  },
  {
    "email": "departmentadmin@gmail.com",
    "password": "departmentadmin",
    "role":"62ef6bb5b3c24a9c22803c73",
  },
  {
    "email": "organisationadmin@gmail.com",
    "password": "organisationadmin",
    "role":"62ef6bb5b3c24a9c22803c74",
  },
];

const importData = async () => {
  try {
    await userModel.deleteMany({});
    await userModel.insertMany(seedUsers);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

importData().then(() => {
  mongoose.connection.close();
});
