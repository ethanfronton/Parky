const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/html/index.html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "html/index.html"));
});

app.get("/html/resa.html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "html/resa.html"));
});

app.get("/html/about.html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "html/about.html"));
});

app.get("/html/id.html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "html/id.html"));
});

app.listen(3001, () => {
  console.log("Serveur en attente des requêtes au port 3001");
});
