const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//se referer au fichier model pour la creation de la base de données via ORM sequelize
const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => { // force: true force la creation de la base à chaque compilation
  console.log("Drop and re-sync db.");
  run();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});
// Ajouter les routes d app
require("./app/routes/offre.routes")(app);
require("./app/routes/typeoffre.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
