const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/key");

//Models
require("./models/incident");

const app = express();

//Routes
const IncidentRoutes = require("./routes/incident.routes");

//Middlewares
app.use(bodyParser.json());

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-ABR, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Custom-Filter-Header"
  );
  res.header("Access-Control-Expose-Headers", "X-ABR");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes Implements
app.use("/api", IncidentRoutes);

//Conection to database and run application
const port = process.env.PORT || 3000;
const uri = keys.MONGO_URI;

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.info("Server is runing on port: " + port);
  }
});
mongoose.connect(uri);
