const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/html/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/index.html"));
});

app.get("/html/resa.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/resa.html"));
});

app.get("/html/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/about.html"));
});

app.get("/html/id.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/id.html"));
});

app.get("/html/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/register.html"));
});

app.listen(3001, () => {
  console.log("Serveur en attente des requêtes au port 3001");
});
