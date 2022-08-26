const express = require("express");
const authRoute = require("./routes/auth");
const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
const organisationRoute = require("./routes/organisation");
const departmentRoute = require("./routes/department");
const userRoute = require("./routes/labour");
const grievanceRoute = require("./routes/grievance");
const mainCategoryRoute = require("./routes/mainCategory");
const subCategoryRoute = require("./routes/subCategory");
const employeeRoute = require("./routes/employee");
const roleRoute = require("./routes/base_tables/role");
require ("dotenv").config();

const dbConnection = require("./utils/DBconnection");

const app = express();

app.use(express.json());
app.use(require("cors")());

const routePrefix = "api";

app.use(`/${routePrefix}`, authRoute);
app.use(`/country`,countryRoute)
app.use(`/state`,stateRoute)
app.use(`/district`,districtRoute)
app.use(`/organisation`,organisationRoute)
app.use(`/department`,departmentRoute)
app.use(`/user`,userRoute)
app.use(`/grievance`,grievanceRoute)
app.use(`/mainCategory`,mainCategoryRoute)
app.use(`/subCategory`,subCategoryRoute)
app.use(`/emp`,employeeRoute)
app.use(`/roles`,roleRoute)

app.listen(5000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
