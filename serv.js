require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const rootRoutes = require("./routes/root");
const authRoutes = require("./routes/auth");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/", rootRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/parky")
  
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(authRoutes);

const annonceRoutes = require("./routes/annonces");
app.use("/api/annonces", annonceRoutes);

app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
