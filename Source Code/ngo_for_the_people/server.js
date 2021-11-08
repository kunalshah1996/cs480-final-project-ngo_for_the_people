const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role=db.role;
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NGO for the People" });
});

require("./app/routes/employee.routes")(app);
require('./app/routes/auth.routes')(app);
require("./app/routes/campaign.routes")(app);
require("./app/routes/receiver.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/donor.routes")(app);
require("./app/routes/cause.routes")(app);
require("./app/routes/education.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});