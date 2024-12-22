const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/html/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, "html", page));
});

const parkings = [
  { id: 1, name: "Place 1", location: "Centre-ville", price: 10 },
  { id: 2, name: "Place 2", location: "Gare", price: 8 },
];

app.get("/api/parkings", (req, res) => {
  res.json(parkings);
});

app.post("/api/parkings", (req, res) => {
  const newParking = req.body;
  parkings.push(newParking);
  res.status(201).json(newParking);
});

app.listen(3001, () => {
  console.log("Serveur en attente des requêtes au port 3001");
});
