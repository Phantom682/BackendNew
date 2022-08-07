const express = require("express");
const authRoute = require("./routes/auth");
const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
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

app.listen(5000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
