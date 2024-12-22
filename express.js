const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "parky",
});

connection.connect((err) => {
  if (err) {
    console.log("Erreur de connexion à la base de données :" + err.stack);
    return;
  }
  console.log("Connexion à la base de données réussie");
});

connection.query("SELECT * FROM users", (err, rows, filds) => {
  if (err) throw err;
  console.log("Les données de la table user sont : ", rows);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/html/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, "html", page));
});

app.listen(3001, () => {
  console.log("Serveur en attente des requêtes au port 3001");
});
